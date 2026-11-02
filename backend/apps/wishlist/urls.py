from django.urls import path
from .views import WishlistDetailView, WishlistItemToggleView, WishlistItemDeleteView

urlpatterns = [
    path('', WishlistDetailView.as_view(), name='wishlist-detail'),
    path('toggle/', WishlistItemToggleView.as_view(), name='wishlist-toggle'),
    path('items/<int:pk>/', WishlistItemDeleteView.as_view(), name='wishlist-delete-item'),
]
