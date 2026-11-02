"""
Seed command to populate initial authentic Madhu Silks demonstration data.
Strictly saree products only, matching the exact brand rules.
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from apps.accounts.models import User
from apps.categories.models import Category
from apps.products.models import Product, ProductImage
from apps.marketing.models import Coupon, PromotionalBanner
from apps.core.models import SiteSetting

class Command(BaseCommand):
    help = 'Seeds authentic saree categories, demonstration products, coupons and banners for Madhu Silks.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding Madhu Silks database..."))

        # 1. Create Superuser / Admin
        admin_email = "admin@madhusilks.com"
        if not User.objects.filter(email=admin_email).exists():
            User.objects.create_superuser(
                email=admin_email,
                password="Admin@MadhuSilks2026",
                first_name="Madhu",
                last_name="Silks Admin",
                phone="7338015172",
                role=User.Role.ADMIN
            )
            self.stdout.write(self.style.SUCCESS(f"Created admin user: {admin_email} (password: Admin@MadhuSilks2026)"))

        # 2. Categories (ONLY Sarees)
        categories_data = [
            {
                "name": "Kanchipuram Silk Sarees",
                "slug": "kanchipuram-silk",
                "description": "Legendary handwoven temple border Kanchipuram silk sarees with pure golden zari work.",
                "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
                "display_order": 1
            },
            {
                "name": "Banarasi Sarees",
                "slug": "banarasi",
                "description": "Opulent Mughal-inspired brocade weaving with intricate floral motifs and rich pallus.",
                "image_url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
                "display_order": 2
            },
            {
                "name": "Soft Silk Sarees",
                "slug": "soft-silk",
                "description": "Feather-light, gracefully draping contemporary silks perfect for all-day celebrations.",
                "image_url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
                "display_order": 3
            },
            {
                "name": "Bridal Sarees",
                "slug": "bridal",
                "description": "Grand bridal trousseau sarees woven in auspicious crimson, vermilion and antique gold zari.",
                "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
                "display_order": 4
            },
            {
                "name": "Traditional Sarees",
                "slug": "traditional",
                "description": "Time-honoured heritage sarees passed down through generations across South India.",
                "image_url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
                "display_order": 5
            },
            {
                "name": "Festive Sarees",
                "slug": "festive",
                "description": "Vibrant festive drapes crafted for Diwali, Dussehra, Navratri and family functions.",
                "image_url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
                "display_order": 6
            },
            {
                "name": "Handloom Sarees",
                "slug": "handloom",
                "description": "Artisanal handloom sarees woven on traditional pit looms by skilled master weavers.",
                "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
                "display_order": 7
            },
            {
                "name": "Designer Sarees",
                "slug": "designer",
                "description": "Exclusive contemporary saree creations blending classic zari motifs with modern palettes.",
                "image_url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
                "display_order": 8
            },
        ]

        categories_map = {}
        for cdata in categories_data:
            cat, _ = Category.objects.update_or_create(
                slug=cdata['slug'],
                defaults=cdata
            )
            categories_map[cdata['slug']] = cat
            self.stdout.write(f"Category verified: {cat.name}")

        # 3. Demonstration Saree Products (Real Paise Prices, Unique SKUs)
        products_data = [
            {
                "sku": "MS-KAN-001",
                "name": "Kanchipuram Crimson Royal Bridal Silk Saree",
                "slug": "kanchipuram-crimson-royal-bridal-silk-saree",
                "category": categories_map["kanchipuram-silk"],
                "description": "An exquisite Kanchipuram bridal masterpiece in rich auspicious crimson maroon. Features intricate floral jaal weaving across the body with solid gold zari temple borders (Korvai technique) and a grand regal pallu depicting traditional peacock (Mayil) motifs.",
                "price_paise": 2499900,  # ₹24,999
                "sale_price_paise": 2199900,  # ₹21,999 (Sale)
                "colour": "Crimson Maroon & Antique Gold",
                "fabric": "Pure Mulberry Silk",
                "saree_type": "Kanchipuram Silk",
                "occasion": "Bridal & Wedding Reception",
                "weaving_details": "Handwoven Korvai Weaving with Heavy Antique Zari Jacquard",
                "saree_length": "5.5 Meters",
                "blouse_piece_details": "Included - 0.8 Meters Contrast Running Silk with Brocade Border",
                "stock_quantity": 4,
                "is_featured": True,
                "is_new_arrival": False,
                "is_best_seller": True,
                "images": [
                    {"url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", "view": "FRONT", "is_primary": True},
                    {"url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85", "view": "PALLU", "is_primary": False},
                    {"url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85", "view": "BORDER", "is_primary": False},
                ]
            },
            {
                "sku": "MS-BAN-002",
                "name": "Banarasi Katan Silk Deep Emerald Kadwa Weave Saree",
                "slug": "banarasi-katan-silk-deep-emerald-saree",
                "category": categories_map["banarasi"],
                "description": "Authentic Banarasi Katan silk saree woven in a magnificent deep emerald bottle green. Adorned with delicate floral shikargah bootis using ancient Kadwa hand-weaving technique, finished with an ornate floral meenakari border and dense zari pallu.",
                "price_paise": 1850000,  # ₹18,500
                "sale_price_paise": 1699900,  # ₹16,999
                "colour": "Deep Emerald Green",
                "fabric": "Pure Katan Silk",
                "saree_type": "Banarasi Silk",
                "occasion": "Festive & Wedding Guest",
                "weaving_details": "Traditional Kadwa Handloom Technique with Fine Gold Zari",
                "saree_length": "5.5 Meters",
                "blouse_piece_details": "Included - 0.8 Meters Plain Silk Blouse with Zari Border",
                "stock_quantity": 3,
                "is_featured": True,
                "is_new_arrival": True,
                "is_best_seller": True,
                "images": [
                    {"url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85", "view": "FRONT", "is_primary": True},
                    {"url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", "view": "BORDER", "is_primary": False},
                ]
            },
            {
                "sku": "MS-SFT-003",
                "name": "Pastel Peach Soft Silk Festive Saree with Silver Zari",
                "slug": "pastel-peach-soft-silk-festive-saree",
                "category": categories_map["soft-silk"],
                "description": "Modern elegance meets heritage weaving. Crafted from lightweight, breathable soft mulberry silk in a soothing pastel peach hue. Accented with subtle silver zari diagonal chevron stripes across the pleats and a sleek contrast border.",
                "price_paise": 799900,  # ₹7,999
                "sale_price_paise": 649900,  # ₹6,499
                "colour": "Pastel Peach",
                "fabric": "Lightweight Soft Silk",
                "saree_type": "Soft Silk",
                "occasion": "Festive & Daytime Celebrations",
                "weaving_details": "Modern Jacquard Loom with Matte Silver Zari",
                "saree_length": "5.5 Meters",
                "blouse_piece_details": "Included - 0.8 Meters Contrast Brocade Blouse Piece",
                "stock_quantity": 6,
                "is_featured": True,
                "is_new_arrival": True,
                "is_best_seller": False,
                "images": [
                    {"url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85", "view": "FRONT", "is_primary": True},
                    {"url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", "view": "PALLU", "is_primary": False},
                ]
            },
            {
                "sku": "MS-BRD-004",
                "name": "South Indian Heritage Vermilion Bridal Kanjivaram Saree",
                "slug": "south-indian-heritage-vermilion-bridal-kanjivaram",
                "category": categories_map["bridal"],
                "description": "Woven especially for South Indian muhurtham rituals. Rich vermilion red silk woven with dense zari checks (Kattam) containing miniature chakra and rudraksha motifs. The heavy pallu showcases intricate temple gopuram architecture.",
                "price_paise": 3200000,  # ₹32,000
                "sale_price_paise": 2899900,  # ₹28,999
                "colour": "Vermilion Red & Sona Rupa Zari",
                "fabric": "Pure Handwoven Silk",
                "saree_type": "Bridal Kanchipuram",
                "occasion": "Bridal Muhurtham",
                "weaving_details": "Traditional Pitloom 3-Ply Silk with Tested Zari",
                "saree_length": "5.5 Meters",
                "blouse_piece_details": "Included - 0.9 Meters Heavy Zari Embellished Blouse Piece",
                "stock_quantity": 2,
                "is_featured": True,
                "is_new_arrival": False,
                "is_best_seller": True,
                "images": [
                    {"url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", "view": "FRONT", "is_primary": True},
                    {"url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85", "view": "BORDER", "is_primary": False},
                ]
            },
            {
                "sku": "MS-HDL-005",
                "name": "Authentic Handloom Mustard Yellow Temple Saree",
                "slug": "authentic-handloom-mustard-yellow-temple-saree",
                "category": categories_map["handloom"],
                "description": "Pure artisanal heritage woven in bright auspicious mustard turmeric yellow. Finished with rustic contrast maroon temple borders and a striped vintage handloom pallu.",
                "price_paise": 950000,  # ₹9,500
                "sale_price_paise": None,  # No discount
                "colour": "Mustard Yellow & Deep Maroon",
                "fabric": "Pure Handloom Silk Cotton Blend",
                "saree_type": "Handloom Saree",
                "occasion": "Traditional Pujas & Housewarming",
                "weaving_details": "Traditional Pit Loom Weave",
                "saree_length": "5.5 Meters",
                "blouse_piece_details": "Included - 0.8 Meters Plain Running Blouse",
                "stock_quantity": 5,
                "is_featured": False,
                "is_new_arrival": True,
                "is_best_seller": False,
                "images": [
                    {"url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85", "view": "FRONT", "is_primary": True},
                ]
            },
            {
                "sku": "MS-FST-006",
                "name": "Royal Sapphire Blue Festive Brocade Silk Saree",
                "slug": "royal-sapphire-blue-festive-brocade-silk-saree",
                "category": categories_map["festive"],
                "description": "Captivating deep royal sapphire blue drape woven with gleaming copper and antique gold zari booti clusters. Drapes effortlessly and shimmers gently under festive evening lights.",
                "price_paise": 1199900,  # ₹11,999
                "sale_price_paise": 999900,  # ₹9,999
                "colour": "Sapphire Blue & Copper Zari",
                "fabric": "Art Silk Brocade",
                "saree_type": "Festive Saree",
                "occasion": "Diwali, Dussehra, Navratri Celebrations",
                "weaving_details": "High-Density Zari Brocade",
                "saree_length": "5.5 Meters",
                "blouse_piece_details": "Included - 0.8 Meters Contrast Golden Blouse Piece",
                "stock_quantity": 7,
                "is_featured": True,
                "is_new_arrival": True,
                "is_best_seller": True,
                "images": [
                    {"url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85", "view": "FRONT", "is_primary": True},
                    {"url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", "view": "DETAIL", "is_primary": False},
                ]
            },
            {
                "sku": "MS-DSG-007",
                "name": "Designer Wine Organza Silk Saree with Hand-Embroidery",
                "slug": "designer-wine-organza-silk-saree",
                "category": categories_map["designer"],
                "description": "Sheer elegance. Crisp yet supple organza silk in royal wine tones, bordered with scalloped hand-embroidery, cutwork detailing and subtle sitara sequins.",
                "price_paise": 1350000,  # ₹13,500
                "sale_price_paise": 1149900,  # ₹11,499
                "colour": "Wine Plum",
                "fabric": "Pure Organza Silk",
                "saree_type": "Designer Saree",
                "occasion": "Cocktail Parties & Receptions",
                "weaving_details": "Fine Organza Weave with Scalloped Zari Cutwork Border",
                "saree_length": "5.5 Meters",
                "blouse_piece_details": "Included - 0.8 Meters Raw Silk Designer Blouse Piece",
                "stock_quantity": 4,
                "is_featured": True,
                "is_new_arrival": True,
                "is_best_seller": False,
                "images": [
                    {"url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85", "view": "FRONT", "is_primary": True},
                ]
            },
            {
                "sku": "MS-TRD-008",
                "name": "Classic Mangalgiri Maroon Traditional Silk Saree with Nizam Border",
                "slug": "classic-mangalgiri-maroon-traditional-silk-saree",
                "category": categories_map["traditional"],
                "description": "The quintessence of traditional South Indian simplicity. Deep maroon body with pure zari Nizam border and micro temple spikes. Elegant and understated.",
                "price_paise": 820000,  # ₹8,200
                "sale_price_paise": 699900,  # ₹6,999
                "colour": "Deep Maroon",
                "fabric": "Mangalgiri Pure Silk",
                "saree_type": "Traditional Saree",
                "occasion": "Temple Visits & Traditional Rituals",
                "weaving_details": "Traditional Nizam Border Weaving",
                "saree_length": "5.5 Meters",
                "blouse_piece_details": "Included - 0.8 Meters Plain Running Silk",
                "stock_quantity": 8,
                "is_featured": False,
                "is_new_arrival": False,
                "is_best_seller": True,
                "images": [
                    {"url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", "view": "FRONT", "is_primary": True},
                ]
            }
        ]

        for pdata in products_data:
            images_list = pdata.pop("images")
            product, _ = Product.objects.update_or_create(
                sku=pdata['sku'],
                defaults=pdata
            )
            # Create images
            for idx, img in enumerate(images_list):
                ProductImage.objects.update_or_create(
                    product=product,
                    view_type=img['view'],
                    defaults={
                        'image_url': img['url'],
                        'is_primary': img.get('is_primary', idx == 0),
                        'display_order': idx,
                        'alt_text': f"{product.name} - {img['view']}"
                    }
                )
            self.stdout.write(f"Product verified: {product.name} ({product.sku})")

        # 4. Promotional Banners
        banners_data = [
            {
                "title": "Tradition Woven Into Every Thread",
                "subtitle": "Discover authentic handwoven sarees celebrating timeless Indian heritage from Jakribettu, Bantwal.",
                "button_text": "Explore Collections",
                "target_url": "/collections",
                "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
                "position": PromotionalBanner.Position.HERO,
                "display_order": 1
            },
            {
                "title": "Grand Bridal Trousseau Collection",
                "subtitle": "Pure Kanchipuram and Banarasi bridal silks woven with heirloom golden zari.",
                "button_text": "Shop Bridal Sarees",
                "target_url": "/bridal",
                "image_url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=85",
                "position": PromotionalBanner.Position.BRIDAL,
                "display_order": 1
            },
            {
                "title": "Festive Celebrations Edit",
                "subtitle": "Bring in joy and auspicious radiance with our festive collection. Free shipping across India.",
                "button_text": "View Festive Sarees",
                "target_url": "/festive",
                "image_url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85",
                "position": PromotionalBanner.Position.FESTIVE,
                "display_order": 1
            },
        ]
        for bdata in banners_data:
            PromotionalBanner.objects.update_or_create(
                title=bdata['title'],
                defaults=bdata
            )

        # 5. Active Coupons
        Coupon.objects.update_or_create(
            code="FESTIVE10",
            defaults={
                "discount_type": Coupon.DiscountType.PERCENTAGE,
                "discount_value": 10,  # 10%
                "min_order_amount_paise": 500000,  # Min ₹5,000
                "max_discount_paise": 150000,  # Max ₹1,500
                "valid_from": timezone.now() - timedelta(days=1),
                "valid_to": timezone.now() + timedelta(days=90),
                "is_active": True
            }
        )

        Coupon.objects.update_or_create(
            code="SILK500",
            defaults={
                "discount_type": Coupon.DiscountType.FIXED,
                "discount_value": 50000,  # ₹500 off
                "min_order_amount_paise": 400000,  # Min ₹4,000
                "valid_from": timezone.now() - timedelta(days=1),
                "valid_to": timezone.now() + timedelta(days=90),
                "is_active": True
            }
        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Madhu Silks database!"))
