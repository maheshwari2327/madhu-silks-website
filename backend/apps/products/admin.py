from django.contrib import admin
from .models import Product, ProductImage, ProductVariant

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3
    fields = ('image', 'image_url', 'view_type', 'is_primary', 'display_order', 'alt_text')

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'sku', 'category', 'price_in_rupees', 'sale_price_in_rupees',
        'stock_quantity', 'status', 'is_featured', 'is_new_arrival', 'is_best_seller'
    )
    list_filter = ('category', 'status', 'is_featured', 'is_new_arrival', 'is_best_seller', 'colour', 'fabric')
    search_fields = ('name', 'sku', 'description', 'fabric', 'colour')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, ProductVariantInline]
    list_editable = ('status', 'stock_quantity', 'is_featured', 'is_new_arrival', 'is_best_seller')

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'view_type', 'is_primary', 'display_order', 'image_url')
    list_filter = ('view_type', 'is_primary')
