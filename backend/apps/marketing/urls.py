from django.urls import path
from .views import PromotionalBannerListView, ApplyCouponView, NewsletterSubscribeView

urlpatterns = [
    path('banners/', PromotionalBannerListView.as_view(), name='marketing-banners'),
    path('coupons/apply/', ApplyCouponView.as_view(), name='marketing-apply-coupon'),
    path('newsletter/subscribe/', NewsletterSubscribeView.as_view(), name='marketing-newsletter'),
]

