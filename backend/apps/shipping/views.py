import re
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Shipment
from .serializers import ShipmentSerializer
from apps.orders.models import Order

class PincodeCheckView(APIView):
    """
    Checks delivery serviceability and estimated transit days across Indian pincodes.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        pincode = request.data.get('pincode', '').strip()
        if not re.match(r'^\d{6}$', pincode):
            return Response(
                {"error": "Please provide a valid 6-digit Indian PIN code."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Madhu Silks ships across India. Origin hub is Bantwal / Mangalore (574211 / 575001).
        # We calculate realistic delivery estimate:
        # Karnataka: 2-3 business days
        # South India: 3-4 business days
        # Rest of India: 4-6 business days
        first_digit = pincode[0]
        if first_digit == '5': # South Zone (Karnataka, AP, Telangana)
            estimated_days = "2 - 3 business days"
        elif first_digit == '6': # Tamil Nadu, Kerala
            estimated_days = "3 - 4 business days"
        elif first_digit in ['4', '7']: # West & East Zone
            estimated_days = "4 - 5 business days"
        else: # North & North East
            estimated_days = "5 - 6 business days"

        return Response({
            "pincode": pincode,
            "serviceable": True,
            "cod_available": False, # Prepaid via Razorpay / WhatsApp order
            "estimated_delivery": estimated_days,
            "courier_partners": "Bluedart, Delhivery, DTDC, Express Air",
            "message": f"Delivery available to PIN {pincode} via Express Courier."
        })


class TrackShipmentView(APIView):
    """
    Retrieves real-time shipment tracking for an order.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number)
        shipment = getattr(order, 'shipment', None)

        if not shipment:
            return Response({
                "order_number": order.order_number,
                "order_status": order.order_status,
                "status": "PROCESSING",
                "message": "Order is being packed at Madhu Silks Jakribettu workshop. Tracking details will be generated upon courier pickup."
            })

        return Response(ShipmentSerializer(shipment).data)

