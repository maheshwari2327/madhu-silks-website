from django.contrib import admin
from .models import CustomerProfile, Address

@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'alternate_phone', 'preferred_saree_types', 'created_at')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'alternate_phone')

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'phone', 'city', 'state', 'pincode', 'address_type', 'is_default')
    list_filter = ('address_type', 'is_default', 'state')
    search_fields = ('full_name', 'phone', 'city', 'pincode', 'user__email')

