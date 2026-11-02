from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'product_name', 'product_sku', 'unit_price_in_rupees', 'quantity', 'total_price_in_rupees')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'order_number', 'customer_name', 'customer_phone', 'total_amount_in_rupees',
        'order_status', 'payment_status', 'created_at'
    )
    list_filter = ('order_status', 'payment_status', 'shipping_state', 'created_at')
    search_fields = ('order_number', 'customer_name', 'customer_email', 'customer_phone', 'shipping_pincode')
    inlines = [OrderItemInline]
    list_editable = ('order_status', 'payment_status')
