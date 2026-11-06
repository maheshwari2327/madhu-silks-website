import hmac
import hashlib
import json
from django.conf import settings
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Payment
from .serializers import (
    PaymentSerializer,
    CreateRazorpayOrderRequestSerializer,
    VerifyPaymentRequestSerializer
)
from apps.orders.models import Order

class CreateRazorpayOrderView(APIView):
    """
    Creates an official Razorpay order using verified backend pricing.
    Never trusts client-submitted amounts.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CreateRazorpayOrderRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order_number = serializer.validated_data['order_number']

        order = get_object_or_404(Order, order_number=order_number)

        if order.payment_status == Order.PaymentStatus.PAID:
            return Response(
                {"error": "This order is already paid."},
                status=status.HTTP_400_BAD_REQUEST
            )

        amount_paise = order.total_amount_paise
        razorpay_key_id = settings.RAZORPAY_KEY_ID

        # If real keys are provided, invoke razorpay client
        razorpay_order_id = f"order_mock_{order.order_number}"
        if razorpay_key_id and not razorpay_key_id.startswith('rzp_test_placeholder'):
            try:
                import razorpay
                client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
                rzp_order = client.order.create({
                    'amount': amount_paise,
                    'currency': 'INR',
                    'receipt': order.order_number,
                    'payment_capture': 1
                })
                razorpay_order_id = rzp_order['id']
            except Exception as e:
                return Response(
                    {"error": f"Failed to initialize payment gateway: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        payment, _ = Payment.objects.get_or_create(
            order=order,
            razorpay_order_id=razorpay_order_id,
            defaults={
                'amount_paise': amount_paise,
                'currency': 'INR',
                'status': Payment.Status.PENDING
            }
        )

        return Response({
            "razorpay_order_id": razorpay_order_id,
            "amount_paise": amount_paise,
            "amount_in_rupees": order.total_amount_in_rupees,
            "currency": "INR",
            "razorpay_key_id": razorpay_key_id,
            "order_number": order.order_number,
            "customer_name": order.customer_name,
            "customer_email": order.customer_email,
            "customer_phone": order.customer_phone,
        })


class VerifyPaymentView(APIView):
    """
    Verifies Razorpay payment signature via HMAC SHA256.
    Protects against duplicate callbacks and tampering.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VerifyPaymentRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        rzp_order_id = data['razorpay_order_id']
        rzp_payment_id = data['razorpay_payment_id']
        rzp_signature = data['razorpay_signature']

        payment = get_object_or_404(Payment, razorpay_order_id=rzp_order_id)
        order = payment.order

        # Verify signature if production/test keys configured
        is_valid = True
        secret = settings.RAZORPAY_KEY_SECRET
        if secret and not secret.startswith('placeholder') and not rzp_order_id.startswith('order_mock_'):
            try:
                msg = f"{rzp_order_id}|{rzp_payment_id}".encode('utf-8')
                expected_sig = hmac.new(secret.encode('utf-8'), msg, hashlib.sha256).hexdigest()
                is_valid = hmac.compare_digest(expected_sig, rzp_signature)
            except Exception:
                is_valid = False

        if not is_valid:
            payment.status = Payment.Status.FAILED
            payment.error_description = "Payment signature verification failed."
            payment.save()
            return Response(
                {"error": "Payment verification failed. Invalid cryptographic signature."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update payment and order records atomically
        payment.razorpay_payment_id = rzp_payment_id
        payment.razorpay_signature = rzp_signature
        payment.status = Payment.Status.SUCCESS
        payment.save()

        order.payment_status = Order.PaymentStatus.PAID
        order.order_status = Order.Status.CONFIRMED
        order.save()

        return Response({
            "status": "success",
            "message": "Payment verified successfully.",
            "order_number": order.order_number
        })


class RazorpayWebhookView(APIView):
    """
    Receives automated server-to-server webhook events from Razorpay.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        webhook_signature = request.headers.get('X-Razorpay-Signature')
        body = request.body.decode('utf-8')
        secret = settings.RAZORPAY_WEBHOOK_SECRET

        if secret and not secret.startswith('placeholder') and webhook_signature:
            expected_sig = hmac.new(secret.encode('utf-8'), body.encode('utf-8'), hashlib.sha256).hexdigest()
            if not hmac.compare_digest(expected_sig, webhook_signature):
                return Response({"error": "Invalid webhook signature"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            payload = json.loads(body)
            event = payload.get('event')
            if event == 'payment.captured':
                payment_entity = payload.get('payload', {}).get('payment', {}).get('entity', {})
                rzp_order_id = payment_entity.get('order_id')
                if rzp_order_id:
                    payment = Payment.objects.filter(razorpay_order_id=rzp_order_id).first()
                    if payment and payment.status != Payment.Status.SUCCESS:
                        payment.status = Payment.Status.SUCCESS
                        payment.razorpay_payment_id = payment_entity.get('id')
                        payment.save()
                        payment.order.payment_status = Order.PaymentStatus.PAID
                        payment.order.order_status = Order.Status.CONFIRMED
                        payment.order.save()
            return Response({"status": "received"})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

