from rest_framework import serializers
from .models import CustomerProfile, Address
from apps.accounts.serializers import UserSerializer

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id', 'full_name', 'phone', 'address_line_1', 'address_line_2',
            'landmark', 'city', 'state', 'pincode', 'country',
            'address_type', 'is_default', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class CustomerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = CustomerProfile
        fields = [
            'id', 'user', 'alternate_phone', 'preferred_saree_types',
            'date_of_birth', 'anniversary_date', 'notes', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

