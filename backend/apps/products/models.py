from django.db import models
from django.core.validators import MinValueValidator
from django.utils.text import slugify
from apps.categories.models import Category

class Product(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DRAFT', 'Draft'
        PUBLISHED = 'PUBLISHED', 'Published'
        ARCHIVED = 'ARCHIVED', 'Archived'

    sku = models.CharField(max_length=50, unique=True, db_index=True)
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=280, unique=True, db_index=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='products'
    )
    description = models.TextField()

    # Pricing stored strictly in paise (e.g. 599900 = ₹5,999) to avoid floating point inaccuracies
    price_paise = models.PositiveBigIntegerField(
        validators=[MinValueValidator(100)],
        help_text="Regular price in Indian paise (e.g. ₹5,999 = 599900 paise)"
    )
    sale_price_paise = models.PositiveBigIntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(100)],
        help_text="Discounted sale price in Indian paise. Null if no discount."
    )

    # Authentic Saree Specifications
    colour = models.CharField(max_length=100, db_index=True)
    fabric = models.CharField(max_length=150, db_index=True)
    saree_type = models.CharField(max_length=150, db_index=True, help_text="e.g. Pure Silk, Soft Silk, Kanchipuram")
    occasion = models.CharField(max_length=150, db_index=True, help_text="e.g. Bridal, Festive, Traditional, Party")
    weaving_details = models.CharField(max_length=255, help_text="e.g. Handwoven Pure Zari Jacquard")
    saree_length = models.CharField(max_length=50, default="5.5 Meters", help_text="Standard 5.5 Meters")
    blouse_piece_details = models.CharField(
        max_length=255,
        default="Included - 0.8 Meters Contrast Running Blouse Piece"
    )

    # Stock & Inventory
    stock_quantity = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(0)],
        help_text="Current available inventory units."
    )

    # Merchandising flags
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PUBLISHED, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    is_new_arrival = models.BooleanField(default=False, db_index=True)
    is_best_seller = models.BooleanField(default=False, db_index=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'is_featured']),
            models.Index(fields=['status', 'is_new_arrival']),
            models.Index(fields=['status', 'is_best_seller']),
            models.Index(fields=['category', 'status']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Product.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def price_in_rupees(self):
        return self.price_paise / 100

    @property
    def sale_price_in_rupees(self):
        return self.sale_price_paise / 100 if self.sale_price_paise else None

    @property
    def final_price_paise(self):
        return self.sale_price_paise if self.sale_price_paise else self.price_paise

    @property
    def final_price_in_rupees(self):
        return self.final_price_paise / 100

    @property
    def is_in_stock(self):
        return self.stock_quantity > 0

    @property
    def discount_percent(self):
        if self.sale_price_paise and self.sale_price_paise < self.price_paise:
            diff = self.price_paise - self.sale_price_paise
            return round((diff / self.price_paise) * 100)
        return 0

    def __str__(self):
        return f"{self.name} ({self.sku})"


class ProductImage(models.Model):
    class ViewType(models.TextChoices):
        FRONT = 'FRONT', 'Front View'
        BACK = 'BACK', 'Back View'
        BORDER = 'BORDER', 'Border Close-up'
        PALLU = 'PALLU', 'Pallu Close-up'
        DETAIL = 'DETAIL', 'Weave / Zari Detail'

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    image_url = models.URLField(max_length=600, blank=True, help_text="Cloudinary or CDN hosted URL")
    alt_text = models.CharField(max_length=255, blank=True)
    view_type = models.CharField(
        max_length=20,
        choices=ViewType.choices,
        default=ViewType.FRONT
    )
    is_primary = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', '-is_primary', 'id']

    def save(self, *args, **kwargs):
        if self.is_primary:
            ProductImage.objects.filter(product=self.product, is_primary=True).update(is_primary=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Image for {self.product.name} ({self.view_type})"


class ProductVariant(models.Model):
    """Optional color or weave variants linked to a parent saree product."""
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='variants'
    )
    variant_name = models.CharField(max_length=150)
    sku_suffix = models.CharField(max_length=20)
    additional_price_paise = models.BigIntegerField(default=0)
    stock_quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} - {self.variant_name}"

