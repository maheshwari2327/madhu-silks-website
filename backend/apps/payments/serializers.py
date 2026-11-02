from rest_framework import serializers
from .models import Payment, Refund

class PaymentSerializer(serializers.ModelSerializer):
    amount_in_rupees = serializers.FloatField(read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'order', 'razorpay_order_id', 'razorpay_payment_id',
            'amount_in_rupees', 'currency', 'status', 'payment_method', 'created_at'
        ]


class CreateRazorpayOrderRequestSerializer(serializers.Serializer):
    order_number = serializers.CharField(max_length=50)


class VerifyPaymentRequestSerializer(serializers.Serializer):
    razorpay_order_id = serializers.CharField(max_length=100)
    razorpay_payment_id = serializers.CharField(max_length=100)
    razorpay_signature = serializers.CharField(max_length=255)
