from django.urls import path
from .views import CustomerProfileDetailView, AddressListCreateView, AddressDetailView

urlpatterns = [
    path('profile/', CustomerProfileDetailView.as_view(), name='customer-profile'),
    path('addresses/', AddressListCreateView.as_view(), name='customer-address-list'),
    path('addresses/<int:pk>/', AddressDetailView.as_view(), name='customer-address-detail'),
]

