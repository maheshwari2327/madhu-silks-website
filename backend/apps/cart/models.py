from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from apps.products.models import Product

class Cart(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='carts'
    )
    session_key = models.CharField(max_length=64, blank=True, null=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())

    @property
    def subtotal_paise(self):
        return sum(item.total_price_paise for item in self.items.all())

    @property
    def subtotal_in_rupees(self):
        return self.subtotal_paise / 100

    def __str__(self):
        owner = self.user.email if self.user else f"Guest ({self.session_key})"
        return f"Cart for {owner} ({self.total_items} items)"


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='cart_items'
    )
    quantity = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('cart', 'product')

    @property
    def unit_price_paise(self):
        return self.product.final_price_paise

    @property
    def unit_price_in_rupees(self):
        return self.unit_price_paise / 100

    @property
    def total_price_paise(self):
        return self.unit_price_paise * self.quantity

    @property
    def total_price_in_rupees(self):
        return self.total_price_paise / 100

    def __str__(self):
        return f"{self.quantity}x {self.product.name}"

