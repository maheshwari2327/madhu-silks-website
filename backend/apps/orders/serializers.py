from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.serializers import ProductListSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    unit_price_in_rupees = serializers.FloatField(read_only=True)
    total_price_in_rupees = serializers.FloatField(read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'product_name', 'product_sku',
            'product_image_url', 'unit_price_in_rupees', 'quantity', 'total_price_in_rupees'
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    subtotal_in_rupees = serializers.FloatField(read_only=True)
    discount_in_rupees = serializers.FloatField(read_only=True)
    shipping_in_rupees = serializers.FloatField(read_only=True)
    total_amount_in_rupees = serializers.FloatField(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'customer_name', 'customer_email', 'customer_phone',
            'shipping_address_line_1', 'shipping_address_line_2', 'shipping_landmark',
            'shipping_city', 'shipping_state', 'shipping_pincode', 'shipping_country',
            'delivery_notes', 'subtotal_in_rupees', 'discount_in_rupees', 'shipping_in_rupees',
            'total_amount_in_rupees', 'total_amount_paise', 'coupon_code', 'order_status',
            'payment_status', 'payment_method', 'items', 'created_at'
        ]
        read_only_fields = [
            'id', 'order_number', 'order_status', 'payment_status', 'created_at'
        ]


class CheckoutRequestSerializer(serializers.Serializer):
    customer_name = serializers.CharField(max_length=150)
    customer_email = serializers.EmailField()
    customer_phone = serializers.CharField(max_length=20)
    shipping_address_line_1 = serializers.CharField(max_length=255)
    shipping_address_line_2 = serializers.CharField(max_length=255, required=False, allow_blank=True)
    shipping_landmark = serializers.CharField(max_length=150, required=False, allow_blank=True)
    shipping_city = serializers.CharField(max_length=100)
    shipping_state = serializers.CharField(max_length=100)
    shipping_pincode = serializers.CharField(max_length=10)
    shipping_country = serializers.CharField(max_length=100, default='India')
    delivery_notes = serializers.CharField(required=False, allow_blank=True)
    coupon_code = serializers.CharField(required=False, allow_blank=True)
