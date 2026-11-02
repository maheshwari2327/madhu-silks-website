from django.contrib import admin
from .models import Shipment

@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ('order', 'awb_code', 'courier_name', 'status', 'estimated_delivery_date', 'shipped_at')
    list_filter = ('status', 'courier_name')
    search_fields = ('order__order_number', 'awb_code')
