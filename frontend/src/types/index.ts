export interface ProductImage {
  id: number;
  url: string;
  alt_text: string;
  view_type: 'FRONT' | 'BACK' | 'BORDER' | 'PALLU' | 'DETAIL';
  is_primary: boolean;
  display_order: number;
}

export interface ProductVariant {
  id: number;
  variant_name: string;
  sku_suffix: string;
  additional_price_paise: number;
  stock_quantity: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
  product_count?: number;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  slug: string;
  category_name?: string;
  category_slug?: string;
  category?: Category;
  description?: string;
  price_paise: number;
  sale_price_paise: number | null;
  price_in_rupees: number;
  sale_price_in_rupees: number | null;
  final_price_in_rupees: number;
  discount_percent: number;
  colour: string;
  fabric: string;
  saree_type: string;
  occasion: string;
  weaving_details?: string;
  saree_length?: string;
  blouse_piece_details?: string;
  stock_quantity: number;
  is_in_stock: boolean;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  primary_image?: ProductImage;
  secondary_image?: ProductImage;
  images?: ProductImage[];
  variants?: ProductVariant[];
  related_products?: Product[];
}

export interface CartItem {
  id: string | number;
  product: Product;
  quantity: number;
  unit_price_in_rupees: number;
  total_price_in_rupees: number;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'CUSTOMER' | 'ADMIN' | 'STAFF';
}

export interface OrderItem {
  id: number;
  product: number;
  product_name: string;
  product_sku: string;
  product_image_url: string;
  unit_price_in_rupees: number;
  quantity: number;
  total_price_in_rupees: number;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address_line_1: string;
  shipping_address_line_2?: string;
  shipping_landmark?: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  shipping_country: string;
  delivery_notes?: string;
  subtotal_in_rupees: number;
  discount_in_rupees: number;
  shipping_in_rupees: number;
  total_amount_in_rupees: number;
  total_amount_paise: number;
  coupon_code?: string;
  order_status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED';
  payment_status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  payment_method: string;
  items: OrderItem[];
  created_at: string;
}

export interface PromotionalBanner {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  target_url: string;
  image_url: string;
  position: 'HERO' | 'ANNOUNCEMENT' | 'FESTIVE' | 'BRIDAL' | 'STRIP';
  display_order: number;
}

