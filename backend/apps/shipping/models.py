from django.db import models
from apps.orders.models import Order

class Shipment(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending Courier Assignment'
        MANIFESTED = 'MANIFESTED', 'Manifested / Packed'
        PICKED_UP = 'PICKED_UP', 'Picked Up'
        IN_TRANSIT = 'IN_TRANSIT', 'In Transit'
        OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY', 'Out for Delivery'
        DELIVERED = 'DELIVERED', 'Delivered'
        RTO = 'RTO', 'Returned to Origin'
        CANCELLED = 'CANCELLED', 'Cancelled'

    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name='shipment'
    )
    shiprocket_shipment_id = models.CharField(max_length=100, blank=True)
    shiprocket_order_id = models.CharField(max_length=100, blank=True)
    awb_code = models.CharField(max_length=100, blank=True, db_index=True, help_text="Air Waybill Tracking Number")
    courier_name = models.CharField(max_length=100, blank=True)
    tracking_url = models.URLField(max_length=500, blank=True)
    shipping_label_url = models.URLField(max_length=500, blank=True)
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.PENDING)
    estimated_delivery_date = models.DateField(null=True, blank=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Shipment for Order #{self.order.order_number} ({self.status})"

