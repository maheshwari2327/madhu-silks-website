from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SiteSetting, ContactMessage, Notification
from .serializers import SiteSettingSerializer, ContactMessageSerializer, NotificationSerializer

class SiteSettingsPublicView(APIView):
    """Returns public business configuration like address, phone, instagram."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({
            "brand_name": "Madhu Silks",
            "tagline": "Tradition Woven Into Every Thread",
            "address": "Madhu Silks, Jakribettu, Bantwal, Karnataka, India",
            "phone": "7338015172",
            "whatsapp": "8749090701",
            "email": "madhusilks701@gmail.com",
            "instagram": "https://www.instagram.com/madhusilksbantwal/",
            "shipping_across_india": True,
        })


class ContactMessageCreateView(generics.CreateAPIView):
    """Allows customers to submit contact inquiries."""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]


class NotificationListView(generics.ListAPIView):
    """Lists notifications for authenticated users."""
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
