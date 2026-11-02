from django.db import models
from django.conf import settings
from django.utils import timezone
from apps.orders.models import Order

class Coupon(models.Model):
    class DiscountType(models.TextChoices):
        PERCENTAGE = 'PERCENTAGE', 'Percentage'
        FIXED = 'FIXED', 'Fixed Amount in Paise'

    code = models.CharField(max_length=50, unique=True, db_index=True)
    discount_type = models.CharField(max_length=20, choices=DiscountType.choices, default=DiscountType.PERCENTAGE)
    discount_value = models.PositiveIntegerField(help_text="Percentage (e.g. 10 for 10%) or Amount in paise (e.g. 50000 for ₹500)")
    min_order_amount_paise = models.PositiveBigIntegerField(default=0)
    max_discount_paise = models.PositiveBigIntegerField(null=True, blank=True)
    valid_from = models.DateTimeField(default=timezone.now)
    valid_to = models.DateTimeField()
    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    times_used = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid_now(self):
        now = timezone.now()
        if not self.is_active:
            return False, "Coupon is not active."
        if now < self.valid_from or now > self.valid_to:
            return False, "Coupon has expired."
        if self.usage_limit and self.times_used >= self.usage_limit:
            return False, "Coupon usage limit reached."
        return True, "Valid"

    def calculate_discount_paise(self, order_amount_paise):
        if order_amount_paise < self.min_order_amount_paise:
            return 0
        if self.discount_type == self.DiscountType.PERCENTAGE:
            discount = (order_amount_paise * self.discount_value) // 100
        else:
            discount = self.discount_value

        if self.max_discount_paise and discount > self.max_discount_paise:
            discount = self.max_discount_paise
        return min(discount, order_amount_paise)

    def __str__(self):
        return self.code


class CouponUsage(models.Model):
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, related_name='usages')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    used_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.coupon.code} used for Order #{self.order.order_number}"


class PromotionalBanner(models.Model):
    class Position(models.TextChoices):
        HERO = 'HERO', 'Homepage Hero Carousel'
        ANNOUNCEMENT = 'ANNOUNCEMENT', 'Top Announcement Bar'
        FESTIVE = 'FESTIVE', 'Festive Offer Section'
        BRIDAL = 'BRIDAL', 'Bridal Collection Banner'
        STRIP = 'STRIP', 'Mid-page Promotional Strip'

    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    button_text = models.CharField(max_length=50, default='Shop Now')
    target_url = models.CharField(max_length=255, default='/collections')
    image_url = models.URLField(max_length=600, blank=True)
    position = models.CharField(max_length=30, choices=Position.choices, default=Position.HERO)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['position', 'display_order', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.position})"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
