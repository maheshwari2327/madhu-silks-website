from rest_framework import serializers
from .models import Product, ProductImage, ProductVariant
from apps.categories.serializers import CategorySerializer

class ProductImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'url', 'alt_text', 'view_type', 'is_primary', 'display_order']

    def get_url(self, obj):
        if obj.image_url:
            return obj.image_url
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'variant_name', 'sku_suffix', 'additional_price_paise', 'stock_quantity']


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    primary_image = serializers.SerializerMethodField()
    secondary_image = serializers.SerializerMethodField()
    price_in_rupees = serializers.FloatField(read_only=True)
    sale_price_in_rupees = serializers.FloatField(read_only=True)
    final_price_in_rupees = serializers.FloatField(read_only=True)
    discount_percent = serializers.IntegerField(read_only=True)
    is_in_stock = serializers.BooleanField(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'sku', 'name', 'slug', 'category_name', 'category_slug',
            'price_paise', 'sale_price_paise', 'price_in_rupees',
            'sale_price_in_rupees', 'final_price_in_rupees', 'discount_percent',
            'colour', 'fabric', 'saree_type', 'occasion', 'stock_quantity',
            'is_in_stock', 'is_featured', 'is_new_arrival', 'is_best_seller',
            'primary_image', 'secondary_image'
        ]

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        if img:
            return ProductImageSerializer(img, context=self.context).data
        return None

    def get_secondary_image(self, obj):
        images = list(obj.images.all())
        if len(images) > 1:
            return ProductImageSerializer(images[1], context=self.context).data
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    price_in_rupees = serializers.FloatField(read_only=True)
    sale_price_in_rupees = serializers.FloatField(read_only=True)
    final_price_in_rupees = serializers.FloatField(read_only=True)
    discount_percent = serializers.IntegerField(read_only=True)
    is_in_stock = serializers.BooleanField(read_only=True)
    related_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'sku', 'name', 'slug', 'category', 'description',
            'price_paise', 'sale_price_paise', 'price_in_rupees',
            'sale_price_in_rupees', 'final_price_in_rupees', 'discount_percent',
            'colour', 'fabric', 'saree_type', 'occasion', 'weaving_details',
            'saree_length', 'blouse_piece_details', 'stock_quantity',
            'is_in_stock', 'is_featured', 'is_new_arrival', 'is_best_seller',
            'status', 'images', 'variants', 'related_products', 'created_at'
        ]

    def get_related_products(self, obj):
        related = Product.objects.filter(
            category=obj.category,
            status=Product.Status.PUBLISHED
        ).exclude(id=obj.id)[:4]
        return ProductListSerializer(related, many=True, context=self.context).data
