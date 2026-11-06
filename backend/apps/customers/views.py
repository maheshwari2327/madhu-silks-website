from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import CustomerProfile, Address
from .serializers import CustomerProfileSerializer, AddressSerializer

class CustomerProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = CustomerProfile.objects.get_or_create(user=self.request.user)
        return profile


class AddressListCreateView(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # If user has no existing addresses, make the first one default
        is_first = not Address.objects.filter(user=self.request.user).exists()
        serializer.save(
            user=self.request.user,
            is_default=serializer.validated_data.get('is_default', is_first)
        )


class AddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

