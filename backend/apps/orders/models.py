import uuid
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from django.utils import timezone
from apps.products.models import Product

class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        CONFIRMED = 'CONFIRMED', 'Confirmed'
        PROCESSING = 'PROCESSING', 'Processing'
        PACKED = 'PACKED', 'Packed'
        SHIPPED = 'SHIPPED', 'Shipped'
        OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY', 'Out for Delivery'
        DELIVERED = 'DELIVERED', 'Delivered'
        CANCELLED = 'CANCELLED', 'Cancelled'
        RETURNED = 'RETURNED', 'Returned'
        REFUNDED = 'REFUNDED', 'Refunded'

    class PaymentStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        PAID = 'PAID', 'Paid'
        FAILED = 'FAILED', 'Failed'
        REFUNDED = 'REFUNDED', 'Refunded'

    order_number = models.CharField(max_length=50, unique=True, db_index=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='orders'
    )

    # Customer snapshot
    customer_name = models.CharField(max_length=150)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)

    # Shipping Address snapshot
    shipping_address_line_1 = models.CharField(max_length=255)
    shipping_address_line_2 = models.CharField(max_length=255, blank=True)
    shipping_landmark = models.CharField(max_length=150, blank=True)
    shipping_city = models.CharField(max_length=100)
    shipping_state = models.CharField(max_length=100)
    shipping_pincode = models.CharField(max_length=10)
    shipping_country = models.CharField(max_length=100, default='India')
    delivery_notes = models.TextField(blank=True)

    # Financial details strictly stored in paise
    subtotal_paise = models.PositiveBigIntegerField()
    discount_paise = models.PositiveBigIntegerField(default=0)
    shipping_charges_paise = models.PositiveBigIntegerField(default=0)
    tax_paise = models.PositiveBigIntegerField(default=0)
    total_amount_paise = models.PositiveBigIntegerField()

    coupon_code = models.CharField(max_length=50, blank=True)

    # Status tracking
    order_status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.PENDING,
        db_index=True
    )
    payment_status = models.CharField(
        max_length=20,
        choices=PaymentStatus.choices,
        default=PaymentStatus.PENDING,
        db_index=True
    )

    payment_method = models.CharField(max_length=50, default='RAZORPAY')

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    @classmethod
    def generate_order_number(cls):
        date_str = timezone.now().strftime('%Y%m%d')
        unique_suffix = uuid.uuid4().hex[:6].upper()
        return f"MS-{date_str}-{unique_suffix}"

    @property
    def total_amount_in_rupees(self):
        return self.total_amount_paise / 100

    @property
    def subtotal_in_rupees(self):
        return self.subtotal_paise / 100

    @property
    def discount_in_rupees(self):
        return self.discount_paise / 100

    @property
    def shipping_in_rupees(self):
        return self.shipping_charges_paise / 100

    def __str__(self):
        return f"Order #{self.order_number} - {self.customer_name} (₹{self.total_amount_in_rupees})"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name='ordered_items'
    )
    # Immutable snapshots at the time of purchase
    product_name = models.CharField(max_length=255)
    product_sku = models.CharField(max_length=50)
    product_image_url = models.URLField(max_length=600, blank=True)
    unit_price_paise = models.PositiveBigIntegerField()
    quantity = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    total_price_paise = models.PositiveBigIntegerField()

    @property
    def unit_price_in_rupees(self):
        return self.unit_price_paise / 100

    @property
    def total_price_in_rupees(self):
        return self.total_price_paise / 100

    def __str__(self):
        return f"{self.quantity}x {self.product_name} in {self.order.order_number}"
