from rest_framework import serializers
from .models import Cart, CartItem
from apps.products.serializers import ProductListSerializer
from apps.products.models import Product

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.filter(status=Product.Status.PUBLISHED),
        source='product',
        write_only=True
    )
    unit_price_in_rupees = serializers.FloatField(read_only=True)
    total_price_in_rupees = serializers.FloatField(read_only=True)

    class Meta:
        model = CartItem
        fields = [
            'id', 'product', 'product_id', 'quantity',
            'unit_price_in_rupees', 'total_price_in_rupees'
        ]

    def validate(self, attrs):
        product = attrs.get('product')
        quantity = attrs.get('quantity', 1)
        if product and quantity > product.stock_quantity:
            raise serializers.ValidationError(
                f"Only {product.stock_quantity} units available in stock for this saree."
            )
        return attrs


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.IntegerField(read_only=True)
    subtotal_in_rupees = serializers.FloatField(read_only=True)
    subtotal_paise = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_items', 'subtotal_paise', 'subtotal_in_rupees', 'created_at']
