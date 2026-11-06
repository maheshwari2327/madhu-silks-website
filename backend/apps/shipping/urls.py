from django.urls import path
from .views import PincodeCheckView, TrackShipmentView

urlpatterns = [
    path('check-pincode/', PincodeCheckView.as_view(), name='shipping-check-pincode'),
    path('track/<str:order_number>/', TrackShipmentView.as_view(), name='shipping-track'),
]

