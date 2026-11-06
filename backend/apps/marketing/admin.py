from django.contrib import admin
from .models import Coupon, CouponUsage, PromotionalBanner, NewsletterSubscriber

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_type', 'discount_value', 'valid_from', 'valid_to', 'times_used', 'is_active')
    list_filter = ('discount_type', 'is_active')
    search_fields = ('code',)

@admin.register(PromotionalBanner)
class PromotionalBannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'position', 'target_url', 'display_order', 'is_active')
    list_filter = ('position', 'is_active')
    list_editable = ('display_order', 'is_active')

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'subscribed_at')
    search_fields = ('email',)

