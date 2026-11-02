# Madhu Silks — REST API Documentation

The backend exposes versioned REST APIs under the `/api/v1/` prefix with full interactive Swagger UI available at `/api/docs/`.

## Authentication Endpoints (`/api/v1/auth/`)
- `POST /api/v1/auth/register/`: Register a new customer account.
- `POST /api/v1/auth/login/`: Obtain authentication token.
- `POST /api/v1/auth/logout/`: Invalidate session and revoke token.
- `GET /api/v1/auth/me/`: Retrieve current authenticated profile.

## Product & Category Endpoints
- `GET /api/v1/products/`: Paginated saree catalog.
  - Query parameters: `category`, `colour`, `fabric`, `occasion`, `min_price`, `max_price`, `in_stock`, `search`, `ordering`.
- `GET /api/v1/products/<slug>/`: Detailed verified saree specs, multi-image views, and related items.
- `GET /api/v1/products/featured/`: Curated featured sarees.
- `GET /api/v1/products/new-arrivals/`: Latest arrivals.
- `GET /api/v1/products/best-sellers/`: Customer favourite best sellers.
- `GET /api/v1/categories/`: Saree categories with published product counts.

## Cart & Wishlist Endpoints
- `GET /api/v1/cart/`: Current user/session shopping cart.
- `POST /api/v1/cart/items/`: Add saree to bag (`product_id`, `quantity`).
- `PATCH /api/v1/cart/items/<id>/`: Update quantity.
- `DELETE /api/v1/cart/items/<id>/`: Remove from bag.
- `GET /api/v1/wishlist/`: Saved sarees.
- `POST /api/v1/wishlist/toggle/`: Toggle saree in wishlist.

## Orders & Payments Endpoints
- `POST /api/v1/orders/checkout/`: Atomic order creation with row locking and stock validation.
- `GET /api/v1/orders/`: List past customer orders.
- `GET /api/v1/orders/<order_number>/`: Specific order invoice details.
- `POST /api/v1/payments/create-order/`: Creates Razorpay order using verified backend pricing.
- `POST /api/v1/payments/verify/`: Verifies payment signature (HMAC SHA256).
- `POST /api/v1/payments/webhook/`: Real-time server-to-server webhook confirmation.

## Logistics & Marketing
- `POST /api/v1/shipping/check-pincode/`: Real-time 6-digit Indian PIN code transit validation.
- `GET /api/v1/shipping/track/<order_number>/`: Live courier tracking.
- `POST /api/v1/marketing/coupons/apply/`: Validates promotional coupon codes (`FESTIVE10`, `SILK500`).
