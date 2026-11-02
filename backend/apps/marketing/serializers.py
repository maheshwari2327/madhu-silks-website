from rest_framework import serializers
from .models import Coupon, PromotionalBanner, NewsletterSubscriber

class PromotionalBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionalBanner
        fields = ['id', 'title', 'subtitle', 'button_text', 'target_url', 'image_url', 'position', 'display_order']


class ApplyCouponRequestSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=50)
    order_amount_paise = serializers.IntegerField(min_value=1)


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at']
        read_only_fields = ['id', 'subscribed_at']
