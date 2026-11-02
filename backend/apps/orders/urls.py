from django.urls import path
from .views import OrderListView, OrderDetailView, CheckoutCreateOrderView

urlpatterns = [
    path('', OrderListView.as_view(), name='order-list'),
    path('checkout/', CheckoutCreateOrderView.as_view(), name='order-checkout'),
    path('<str:order_number>/', OrderDetailView.as_view(), name='order-detail'),
]
