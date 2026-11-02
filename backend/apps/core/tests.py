import pytest
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from apps.accounts.models import User
from apps.categories.models import Category
from apps.products.models import Product
from apps.orders.models import Order
from apps.marketing.models import Coupon

class MadhuSilksBackendTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(
            name="Kanchipuram Silk Sarees",
            slug="kanchipuram-silk",
            description="Authentic Kanchipuram silk sarees"
        )
        self.product = Product.objects.create(
            sku="TEST-KAN-001",
            name="Test Kanchipuram Bridal Saree",
            slug="test-kanchipuram-bridal-saree",
            category=self.category,
            description="Pure silk test saree",
            price_paise=2000000, # ₹20,000
            sale_price_paise=1800000, # ₹18,000
            colour="Crimson",
            fabric="Pure Mulberry Silk",
            saree_type="Kanchipuram Silk",
            occasion="Bridal",
            stock_quantity=5,
            status=Product.Status.PUBLISHED
        )

    def test_saree_pricing_in_paise_and_rupees(self):
        """Validates paise money storage rule and rupees property conversion."""
        self.assertEqual(self.product.price_paise, 2000000)
        self.assertEqual(self.product.price_in_rupees, 20000.0)
        self.assertEqual(self.product.final_price_in_rupees, 18000.0)
        self.assertEqual(self.product.discount_percent, 10)

    def test_product_list_api(self):
        """Tests that the public product list API returns published sarees."""
        response = self.client.get('/api/v1/products/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data.get('results', response.data)) >= 1)

    def test_pincode_check_api(self):
        """Tests Indian PIN code serviceability validation."""
        response = self.client.post('/api/v1/shipping/check-pincode/', {'pincode': '574211'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['serviceable'])

    def test_coupon_discount_calculation(self):
        """Tests coupon logic and minimum order constraints."""
        coupon = Coupon.objects.create(
            code="TEST10",
            discount_type=Coupon.DiscountType.PERCENTAGE,
            discount_value=10,
            min_order_amount_paise=500000, # Min ₹5,000
            valid_from="2026-01-01T00:00:00Z",
            valid_to="2027-01-01T00:00:00Z",
            is_active=True
        )
        # Order amount ₹10,000 (1,000,000 paise)
        discount = coupon.calculate_discount_paise(1000000)
        self.assertEqual(discount, 100000) # 10% = ₹1,000 (100,000 paise)
