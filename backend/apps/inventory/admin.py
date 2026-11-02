from django.contrib import admin
from .models import Inventory

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity', 'reserved_quantity', 'available_for_sale', 'low_stock_threshold', 'is_low_stock')
    search_fields = ('product__name', 'product__sku')
