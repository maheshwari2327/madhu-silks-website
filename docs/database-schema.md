# Madhu Silks — PostgreSQL Database Schema

The database schema is normalized and optimized for high-volume read queries, search indexing, and concurrent order transactions.

## Table Inventory
| Table Name | Primary Purpose | Key Fields & Constraints |
|---|---|---|
| `accounts_user` | Authentication & User Roles | `email` (Unique, Username), `role` (CUSTOMER, ADMIN, STAFF), `phone` |
| `customers_customerprofile` | Customer Profile | `user_id` (1:1), `alternate_phone`, `preferred_saree_types` |
| `customers_address` | Shipping & Billing Addresses | `user_id`, `full_name`, `phone`, `city`, `state`, `pincode`, `is_default` |
| `categories_category` | Saree-only Categories | `name`, `slug` (Unique), `display_order`, `is_active` |
| `products_product` | Verified Saree Catalog | `sku` (Unique), `price_paise` (PositiveBigInt), `sale_price_paise`, `stock_quantity`, `status` |
| `products_productimage` | Multi-view Saree Photos | `product_id`, `image_url`, `view_type` (FRONT, BACK, BORDER, PALLU, DETAIL), `is_primary` |
| `inventory_inventory` | Real-time Stock Records | `product_id` (1:1), `quantity`, `reserved_quantity`, `low_stock_threshold` |
| `cart_cart` | Persistent Shopping Cart | `user_id`, `session_key` (Guest carts) |
| `cart_cartitem` | Items in Cart | `cart_id`, `product_id`, `quantity`, Unique(`cart_id`, `product_id`) |
| `wishlist_wishlist` | Customer Wishlist | `user_id` (1:1) |
| `wishlist_wishlistitem` | Saved Sarees | `wishlist_id`, `product_id`, Unique(`wishlist_id`, `product_id`) |
| `orders_order` | Purchase Orders | `order_number` (Unique), `subtotal_paise`, `total_amount_paise`, `order_status`, `payment_status` |
| `orders_orderitem` | Immutable Order Items | `order_id`, `product_id` (PROTECT), `product_name`, `product_sku`, `unit_price_paise` |
| `payments_payment` | Razorpay Transactions | `order_id`, `razorpay_order_id` (Unique), `razorpay_payment_id`, `razorpay_signature` |
| `payments_refund` | Razorpay Refunds | `payment_id`, `razorpay_refund_id` (Unique), `amount_paise`, `status` |
| `shipping_shipment` | Courier Tracking | `order_id` (1:1), `awb_code`, `courier_name`, `tracking_url`, `status` |
| `marketing_coupon` | Discounts & Promotions | `code` (Unique), `discount_type`, `discount_value`, `min_order_amount_paise` |
| `core_sitesetting` | Dynamic Store Configuration | `key` (Unique), `value`, `description` |
