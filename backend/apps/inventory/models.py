from django.db import models
from django.core.validators import MinValueValidator
from apps.products.models import Product

class Inventory(models.Model):
    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        related_name='inventory_record'
    )
    quantity = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        help_text="Available stock units"
    )
    reserved_quantity = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        help_text="Units held temporarily during pending checkout"
    )
    low_stock_threshold = models.PositiveIntegerField(
        default=2,
        help_text="Alert admin when stock falls below this number"
    )
    last_restocked_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Inventories'

    @property
    def available_for_sale(self):
        return max(0, self.quantity - self.reserved_quantity)

    @property
    def is_low_stock(self):
        return self.available_for_sale <= self.low_stock_threshold

    def __str__(self):
        return f"{self.product.name} - Available: {self.available_for_sale} (Total: {self.quantity})"
