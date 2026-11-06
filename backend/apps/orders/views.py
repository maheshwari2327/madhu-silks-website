from django.db import transaction
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Order, OrderItem
from .serializers import OrderSerializer, CheckoutRequestSerializer
from apps.cart.views import get_or_create_cart
from apps.cart.models import Cart
from apps.products.models import Product

class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items')


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'order_number'

    def get_queryset(self):
        # Allow user to view if authenticated and matches, or allow lookup for confirmation page
        if self.request.user.is_authenticated and not self.request.user.is_staff:
            return Order.objects.filter(user=self.request.user).prefetch_related('items')
        return Order.objects.all().prefetch_related('items')


class CheckoutCreateOrderView(APIView):
    """
    Creates an order from the current shopping cart using atomic transaction and row locking
    to prevent overselling.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CheckoutRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        cart = get_or_create_cart(request)
        cart_items = list(cart.items.select_related('product').all())

        if not cart_items:
            return Response(
                {"error": "Your shopping cart is empty."},
                status=status.HTTP_400_BAD_REQUEST
            )

        with transaction.atomic():
            # Lock the product rows to ensure atomicity and prevent race conditions
            product_ids = [item.product.id for item in cart_items]
            locked_products = {
                p.id: p
                for p in Product.objects.select_for_update().filter(id__in=product_ids)
            }

            subtotal_paise = 0
            items_to_create = []

            for item in cart_items:
                product = locked_products.get(item.product.id)
                if not product or product.status != Product.Status.PUBLISHED:
                    return Response(
                        {"error": f"The saree '{item.product.name}' is no longer available."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if product.stock_quantity < item.quantity:
                    return Response(
                        {"error": f"Insufficient stock for '{product.name}'. Only {product.stock_quantity} available."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Deduct inventory atomically
                product.stock_quantity -= item.quantity
                product.save(update_fields=['stock_quantity'])

                item_price_paise = product.final_price_paise
                item_total_paise = item_price_paise * item.quantity
                subtotal_paise += item_total_paise

                primary_img = product.images.filter(is_primary=True).first() or product.images.first()
                img_url = primary_img.image_url if primary_img and primary_img.image_url else ""

                items_to_create.append({
                    'product': product,
                    'product_name': product.name,
                    'product_sku': product.sku,
                    'product_image_url': img_url,
                    'unit_price_paise': item_price_paise,
                    'quantity': item.quantity,
                    'total_price_paise': item_total_paise,
                })

            # Calculate shipping and taxes
            # Free shipping across India for orders above ₹3,000 (300,000 paise), else ₹150 (15000 paise)
            shipping_charges_paise = 0 if subtotal_paise >= 300000 else 15000
            discount_paise = 0
            total_amount_paise = subtotal_paise + shipping_charges_paise - discount_paise

            user = request.user if request.user.is_authenticated else None
            order = Order.objects.create(
                order_number=Order.generate_order_number(),
                user=user,
                customer_name=data['customer_name'],
                customer_email=data['customer_email'],
                customer_phone=data['customer_phone'],
                shipping_address_line_1=data['shipping_address_line_1'],
                shipping_address_line_2=data.get('shipping_address_line_2', ''),
                shipping_landmark=data.get('shipping_landmark', ''),
                shipping_city=data['shipping_city'],
                shipping_state=data['shipping_state'],
                shipping_pincode=data['shipping_pincode'],
                shipping_country=data.get('shipping_country', 'India'),
                delivery_notes=data.get('delivery_notes', ''),
                subtotal_paise=subtotal_paise,
                discount_paise=discount_paise,
                shipping_charges_paise=shipping_charges_paise,
                tax_paise=0,
                total_amount_paise=total_amount_paise,
                coupon_code=data.get('coupon_code', ''),
                order_status=Order.Status.PENDING,
                payment_status=Order.PaymentStatus.PENDING
            )

            for item_data in items_to_create:
                OrderItem.objects.create(order=order, **item_data)

            # Clear cart items after successful order creation
            cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

