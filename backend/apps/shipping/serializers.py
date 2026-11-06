from rest_framework import serializers
from .models import Shipment

class ShipmentSerializer(serializers.ModelSerializer):
    order_number = serializers.CharField(source='order.order_number', read_only=True)

    class Meta:
        model = Shipment
        fields = [
            'id', 'order_number', 'awb_code', 'courier_name',
            'tracking_url', 'status', 'estimated_delivery_date', 'shipped_at', 'delivered_at'
        ]

