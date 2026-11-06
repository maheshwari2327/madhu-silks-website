from django.urls import path
from .views import (
    ProductListView,
    ProductDetailView,
    FeaturedProductsView,
    NewArrivalsView,
    BestSellersView,
    BridalProductsView,
    FestiveProductsView,
)

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('featured/', FeaturedProductsView.as_view(), name='product-featured'),
    path('new-arrivals/', NewArrivalsView.as_view(), name='product-new-arrivals'),
    path('best-sellers/', BestSellersView.as_view(), name='product-best-sellers'),
    path('bridal/', BridalProductsView.as_view(), name='product-bridal'),
    path('festive/', FestiveProductsView.as_view(), name='product-festive'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
]

