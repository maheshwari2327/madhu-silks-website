import { API_BASE_URL } from './constants';
import { Product, Category, Order, PromotionalBanner } from '@/types';

// Fallback seed data matching the Django seed command exactly
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "MS-KAN-001",
    name: "Kanchipuram Crimson Royal Bridal Silk Saree",
    slug: "kanchipuram-crimson-royal-bridal-silk-saree",
    category_name: "Kanchipuram Silk Sarees",
    category_slug: "kanchipuram-silk",
    description: "An exquisite Kanchipuram bridal masterpiece in rich auspicious crimson maroon. Features intricate floral jaal weaving across the body with solid gold zari temple borders (Korvai technique) and a grand regal pallu depicting traditional peacock (Mayil) motifs.",
    price_paise: 2499900,
    sale_price_paise: 2199900,
    price_in_rupees: 24999,
    sale_price_in_rupees: 21999,
    final_price_in_rupees: 21999,
    discount_percent: 12,
    colour: "Crimson Maroon & Antique Gold",
    fabric: "Pure Mulberry Silk",
    saree_type: "Kanchipuram Silk",
    occasion: "Bridal & Wedding Reception",
    weaving_details: "Handwoven Korvai Weaving with Heavy Antique Zari Jacquard",
    saree_length: "5.5 Meters",
    blouse_piece_details: "Included - 0.8 Meters Contrast Running Silk with Brocade Border",
    stock_quantity: 4,
    is_in_stock: true,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    primary_image: {
      id: 1,
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
      alt_text: "Kanchipuram Crimson Royal Bridal Silk Saree",
      view_type: "FRONT",
      is_primary: true,
      display_order: 0
    },
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", alt_text: "Front View", view_type: "FRONT", is_primary: true, display_order: 0 },
      { id: 2, url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85", alt_text: "Pallu Detail", view_type: "PALLU", is_primary: false, display_order: 1 },
      { id: 3, url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85", alt_text: "Border Detail", view_type: "BORDER", is_primary: false, display_order: 2 }
    ]
  },
  {
    id: 2,
    sku: "MS-BAN-002",
    name: "Banarasi Katan Silk Deep Emerald Kadwa Weave Saree",
    slug: "banarasi-katan-silk-deep-emerald-saree",
    category_name: "Banarasi Sarees",
    category_slug: "banarasi",
    description: "Authentic Banarasi Katan silk saree woven in a magnificent deep emerald bottle green. Adorned with delicate floral shikargah bootis using ancient Kadwa hand-weaving technique, finished with an ornate floral meenakari border and dense zari pallu.",
    price_paise: 1850000,
    sale_price_paise: 1699900,
    price_in_rupees: 18500,
    sale_price_in_rupees: 16999,
    final_price_in_rupees: 16999,
    discount_percent: 8,
    colour: "Deep Emerald Green",
    fabric: "Pure Katan Silk",
    saree_type: "Banarasi Silk",
    occasion: "Festive & Wedding Guest",
    weaving_details: "Traditional Kadwa Handloom Technique with Fine Gold Zari",
    saree_length: "5.5 Meters",
    blouse_piece_details: "Included - 0.8 Meters Plain Silk Blouse with Zari Border",
    stock_quantity: 3,
    is_in_stock: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    primary_image: {
      id: 4,
      url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",
      alt_text: "Banarasi Katan Silk Deep Emerald Kadwa Weave Saree",
      view_type: "FRONT",
      is_primary: true,
      display_order: 0
    },
    images: [
      { id: 4, url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85", alt_text: "Front View", view_type: "FRONT", is_primary: true, display_order: 0 },
      { id: 5, url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", alt_text: "Border Detail", view_type: "BORDER", is_primary: false, display_order: 1 }
    ]
  },
  {
    id: 3,
    sku: "MS-SFT-003",
    name: "Pastel Peach Soft Silk Festive Saree with Silver Zari",
    slug: "pastel-peach-soft-silk-festive-saree",
    category_name: "Soft Silk Sarees",
    category_slug: "soft-silk",
    description: "Modern elegance meets heritage weaving. Crafted from lightweight, breathable soft mulberry silk in a soothing pastel peach hue. Accented with subtle silver zari diagonal chevron stripes across the pleats and a sleek contrast border.",
    price_paise: 799900,
    sale_price_paise: 649900,
    price_in_rupees: 7999,
    sale_price_in_rupees: 6499,
    final_price_in_rupees: 6499,
    discount_percent: 19,
    colour: "Pastel Peach",
    fabric: "Lightweight Soft Silk",
    saree_type: "Soft Silk",
    occasion: "Festive & Daytime Celebrations",
    weaving_details: "Modern Jacquard Loom with Matte Silver Zari",
    saree_length: "5.5 Meters",
    blouse_piece_details: "Included - 0.8 Meters Contrast Brocade Blouse Piece",
    stock_quantity: 6,
    is_in_stock: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: false,
    primary_image: {
      id: 6,
      url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85",
      alt_text: "Pastel Peach Soft Silk Festive Saree",
      view_type: "FRONT",
      is_primary: true,
      display_order: 0
    },
    images: [
      { id: 6, url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85", alt_text: "Front View", view_type: "FRONT", is_primary: true, display_order: 0 }
    ]
  },
  {
    id: 4,
    sku: "MS-BRD-004",
    name: "South Indian Heritage Vermilion Bridal Kanjivaram Saree",
    slug: "south-indian-heritage-vermilion-bridal-kanjivaram",
    category_name: "Bridal Sarees",
    category_slug: "bridal",
    description: "Woven especially for South Indian muhurtham rituals. Rich vermilion red silk woven with dense zari checks (Kattam) containing miniature chakra and rudraksha motifs. The heavy pallu showcases intricate temple gopuram architecture.",
    price_paise: 3200000,
    sale_price_paise: 2899900,
    price_in_rupees: 32000,
    sale_price_in_rupees: 28999,
    final_price_in_rupees: 28999,
    discount_percent: 9,
    colour: "Vermilion Red & Sona Rupa Zari",
    fabric: "Pure Handwoven Silk",
    saree_type: "Bridal Kanchipuram",
    occasion: "Bridal Muhurtham",
    weaving_details: "Traditional Pitloom 3-Ply Silk with Tested Zari",
    saree_length: "5.5 Meters",
    blouse_piece_details: "Included - 0.9 Meters Heavy Zari Embellished Blouse Piece",
    stock_quantity: 2,
    is_in_stock: true,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    primary_image: {
      id: 7,
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
      alt_text: "South Indian Heritage Vermilion Bridal Kanjivaram Saree",
      view_type: "FRONT",
      is_primary: true,
      display_order: 0
    },
    images: [
      { id: 7, url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", alt_text: "Front View", view_type: "FRONT", is_primary: true, display_order: 0 }
    ]
  },
  {
    id: 5,
    sku: "MS-HDL-005",
    name: "Authentic Handloom Mustard Yellow Temple Saree",
    slug: "authentic-handloom-mustard-yellow-temple-saree",
    category_name: "Handloom Sarees",
    category_slug: "handloom",
    description: "Pure artisanal heritage woven in bright auspicious mustard turmeric yellow. Finished with rustic contrast maroon temple borders and a striped vintage handloom pallu.",
    price_paise: 950000,
    sale_price_paise: null,
    price_in_rupees: 9500,
    sale_price_in_rupees: null,
    final_price_in_rupees: 9500,
    discount_percent: 0,
    colour: "Mustard Yellow & Deep Maroon",
    fabric: "Pure Handloom Silk Cotton Blend",
    saree_type: "Handloom Saree",
    occasion: "Traditional Pujas & Housewarming",
    weaving_details: "Traditional Pit Loom Weave",
    saree_length: "5.5 Meters",
    blouse_piece_details: "Included - 0.8 Meters Plain Running Blouse",
    stock_quantity: 5,
    is_in_stock: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    primary_image: {
      id: 8,
      url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",
      alt_text: "Authentic Handloom Mustard Yellow Temple Saree",
      view_type: "FRONT",
      is_primary: true,
      display_order: 0
    },
    images: [
      { id: 8, url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85", alt_text: "Front View", view_type: "FRONT", is_primary: true, display_order: 0 }
    ]
  },
  {
    id: 6,
    sku: "MS-FST-006",
    name: "Royal Sapphire Blue Festive Brocade Silk Saree",
    slug: "royal-sapphire-blue-festive-brocade-silk-saree",
    category_name: "Festive Sarees",
    category_slug: "festive",
    description: "Captivating deep royal sapphire blue drape woven with gleaming copper and antique gold zari booti clusters. Drapes effortlessly and shimmers gently under festive evening lights.",
    price_paise: 1199900,
    sale_price_paise: 999900,
    price_in_rupees: 11999,
    sale_price_in_rupees: 9999,
    final_price_in_rupees: 9999,
    discount_percent: 17,
    colour: "Sapphire Blue & Copper Zari",
    fabric: "Art Silk Brocade",
    saree_type: "Festive Saree",
    occasion: "Diwali, Dussehra, Navratri Celebrations",
    weaving_details: "High-Density Zari Brocade",
    saree_length: "5.5 Meters",
    blouse_piece_details: "Included - 0.8 Meters Contrast Golden Blouse Piece",
    stock_quantity: 7,
    is_in_stock: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    primary_image: {
      id: 9,
      url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85",
      alt_text: "Royal Sapphire Blue Festive Brocade Silk Saree",
      view_type: "FRONT",
      is_primary: true,
      display_order: 0
    },
    images: [
      { id: 9, url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85", alt_text: "Front View", view_type: "FRONT", is_primary: true, display_order: 0 }
    ]
  },
  {
    id: 7,
    sku: "MS-DSG-007",
    name: "Designer Wine Organza Silk Saree with Hand-Embroidery",
    slug: "designer-wine-organza-silk-saree",
    category_name: "Designer Sarees",
    category_slug: "designer",
    description: "Sheer elegance. Crisp yet supple organza silk in royal wine tones, bordered with scalloped hand-embroidery, cutwork detailing and subtle sitara sequins.",
    price_paise: 1350000,
    sale_price_paise: 1149900,
    price_in_rupees: 13500,
    sale_price_in_rupees: 11499,
    final_price_in_rupees: 11499,
    discount_percent: 15,
    colour: "Wine Plum",
    fabric: "Pure Organza Silk",
    saree_type: "Designer Saree",
    occasion: "Cocktail Parties & Receptions",
    weaving_details: "Fine Organza Weave with Scalloped Zari Cutwork Border",
    saree_length: "5.5 Meters",
    blouse_piece_details: "Included - 0.8 Meters Raw Silk Designer Blouse Piece",
    stock_quantity: 4,
    is_in_stock: true,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: false,
    primary_image: {
      id: 10,
      url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",
      alt_text: "Designer Wine Organza Silk Saree",
      view_type: "FRONT",
      is_primary: true,
      display_order: 0
    },
    images: [
      { id: 10, url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85", alt_text: "Front View", view_type: "FRONT", is_primary: true, display_order: 0 }
    ]
  },
  {
    id: 8,
    sku: "MS-TRD-008",
    name: "Classic Mangalgiri Maroon Traditional Silk Saree with Nizam Border",
    slug: "classic-mangalgiri-maroon-traditional-silk-saree",
    category_name: "Traditional Sarees",
    category_slug: "traditional",
    description: "The quintessence of traditional South Indian simplicity. Deep maroon body with pure zari Nizam border and micro temple spikes. Elegant and understated.",
    price_paise: 820000,
    sale_price_paise: 699900,
    price_in_rupees: 8200,
    sale_price_in_rupees: 6999,
    final_price_in_rupees: 6999,
    discount_percent: 15,
    colour: "Deep Maroon",
    fabric: "Mangalgiri Pure Silk",
    saree_type: "Traditional Saree",
    occasion: "Temple Visits & Traditional Rituals",
    weaving_details: "Traditional Nizam Border Weaving",
    saree_length: "5.5 Meters",
    blouse_piece_details: "Included - 0.8 Meters Plain Running Silk",
    stock_quantity: 8,
    is_in_stock: true,
    is_featured: false,
    is_new_arrival: false,
    is_best_seller: true,
    primary_image: {
      id: 11,
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
      alt_text: "Classic Mangalgiri Maroon Traditional Silk Saree",
      view_type: "FRONT",
      is_primary: true,
      display_order: 0
    },
    images: [
      { id: 11, url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", alt_text: "Front View", view_type: "FRONT", is_primary: true, display_order: 0 }
    ]
  }
];

export async function fetchProducts(params?: Record<string, string>): Promise<Product[]> {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/products/?${query}`, { next: { revalidate: 30 } });
    if (res.ok) {
      const data = await res.json();
      return data.results || data;
    }
  } catch (err) {
    // Return fallback
  }

  // Filter fallback products locally
  let filtered = [...FALLBACK_PRODUCTS];
  if (params?.category) {
    filtered = filtered.filter(p => p.category_slug === params.category);
  }
  if (params?.occasion) {
    filtered = filtered.filter(p => p.occasion.toLowerCase().includes(params.occasion.toLowerCase()));
  }
  return filtered;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}/`, { next: { revalidate: 30 } });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Return fallback
  }
  return FALLBACK_PRODUCTS.find(p => p.slug === slug) || null;
}

