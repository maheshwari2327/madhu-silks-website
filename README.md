# Madhu Silks — Complete E-Commerce Platform

> **Tradition Woven Into Every Thread**  
> Authentic Indian Saree Retailer &bull; Jakribettu, Bantwal, Karnataka, India  
> Phone: +91 73380 15172 &bull; WhatsApp: +91 87490 90701 &bull; Email: madhusilks701@gmail.com

---

## 🌸 About Madhu Silks
**Madhu Silks** is a complete, production-ready full-stack e-commerce application engineered specifically for an authentic South Indian saree boutique. 

### Core Business Rule
Madhu Silks sells **ONLY** sarees. No dresses, kurtis, or unrelated garments are permitted. All categories, models, and specifications are strictly saree-focused:
- **Kanchipuram Silk Sarees** (Handwoven temple borders & Korvai technique)
- **Banarasi Sarees** (Opulent Mughal kadwa weaves & meenakari motifs)
- **Soft Silk Sarees** (Lightweight, breathable drapes for all-day comfort)
- **Bridal Sarees** (Heirloom crimson & vermilion wedding muhurtham silks)
- **Traditional Sarees** (South Indian heritage weaves)
- **Festive Sarees** (Diwali, Dussehra, and Navratri celebration edits)
- **Handloom Sarees** (Artisanal pitloom cotton & silk drapes)
- **Designer Sarees** (Contemporary scalloped embroidery & organza silks)

---

## 🛠️ Technology Stack
- **Frontend**: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Lucide React, Zustand state management.
- **Backend**: Python 3.12, Django 5.1, Django REST Framework, WhiteNoise, drf-spectacular (OpenAPI / Swagger).
- **Database**: PostgreSQL with local SQLite zero-config fallback.
- **Payments**: Razorpay Orders API, HMAC SHA256 Signature Verification, Webhooks & Refunds.
- **Shipping**: Shiprocket Logistics, 6-digit Indian PIN code validation, Courier assignment & Tracking.
- **WhatsApp**: Direct 1-click WhatsApp order enquiry prefilled with saree details, SKU, and direct boutique consultation.
- **DevOps**: Docker, Docker Compose, Nginx reverse proxy.

---

## 🚀 Quick Start Guide (Beginner Friendly)

### 1. Running the Django Backend
Open PowerShell or your terminal in `C:\Users\HP\Desktop\Madhu Silks`:
```powershell
# 1. Activate the Python virtual environment
.\backend\venv\Scripts\Activate.ps1

# 2. Run database migrations
python backend\manage.py migrate

# 3. Seed demonstration sarees, admin account & categories
python backend\manage.py seed_data

# 4. Start the backend API server
python backend\manage.py runserver 8000
```
- **API URL**: `http://127.0.0.1:8000/`
- **Swagger API Documentation**: `http://127.0.0.1:8000/api/docs/`
- **Django Administration**: `http://127.0.0.1:8000/admin/`
  - **Admin Login**: `admin@madhusilks.com`
  - **Admin Password**: `Admin@MadhuSilks2026`

---

### 2. Running the Next.js Frontend
Open a **second terminal** window in `C:\Users\HP\Desktop\Madhu Silks`:
```powershell
cd frontend
npm run dev
```
- Open your browser at `http://localhost:3000/`.

---

## 📋 Complete Website Page Routes

| Route | Page Name | Key Features |
|---|---|---|
| `/` | **Homepage** | Festive announcement bar, peacock brand identity, hero banner, featured sarees, bridal spotlight, why choose Madhu Silks, customer testimonials, Instagram showcase, newsletter. |
| `/collections` | **Collections Catalog** | Filter by price, colour, fabric, occasion, stock status; sorting by newest, price asc/desc, best-selling. |
| `/collections/[category]` | **Category Pages** | Dedicated dynamic collections for all 8 saree types. |
| `/products/[slug]` | **Product Details** | High-res multi-view gallery, verified saree specifications, live Indian PIN code serviceability check, Add to Bag, Express Checkout, 1-click WhatsApp enquiry. |
| `/bridal` | **Bridal Trousseau** | Curated wedding drapes with WhatsApp video call consultation booking. |
| `/festive` | **Festive Celebrations** | Radiant sarees for Diwali, Dussehra, Navratri with promotional banners. |
| `/cart` | **Shopping Bag** | Quantity controls, real-time subtotal, free shipping progress bar (Free above ₹3,000), coupon code integration. |
| `/checkout` | **Checkout** | Full address validation across Indian states, coupon application (`FESTIVE10`, `SILK500`), Razorpay and WhatsApp payment selection. |
| `/order-confirmation/[id]` | **Order Confirmation** | Invoice details, delivery address, expected courier transit dates, WhatsApp tracking button. |
| `/account/orders` | **Customer Orders** | Track active orders and view past purchases. |
| `/account/wishlist` | **Saved Sarees** | Personal customer wishlist. |
| `/account/login` | **Customer / Admin Login** | Fast sign in with instant admin access. |
| `/admin` | **Boutique Admin Panel** | Revenue dashboard, inventory manager, order status lifecycle updater (`CONFIRMED` &rarr; `SHIPPED` &rarr; `DELIVERED`), promotional coupon controls. |
| `/about` | **About Us** | Jakribettu, Bantwal boutique story, authentic weaving heritage, brand values. |
| `/gallery` | **Visual Gallery** | Saree photography and showroom showcases. |
| `/contact` | **Contact Us** | Address, click-to-call, WhatsApp link, contact form, Google Maps embed of Jakribettu, Bantwal. |
| `/shipping-policy` | **Shipping Policy** | All-India shipping rules, delivery timelines, free delivery threshold. |
| `/return-refund-policy` | **Return & Refund** | 7-day saree inspection return terms and Razorpay refund rules. |
| `/privacy-policy` | **Privacy Policy** | Customer data protection and non-storage of card data. |
| `/terms-and-conditions` | **Terms & Conditions** | Authentic saree retail terms. |

---

## 🔒 Security & Data Integrity
- **Integer Paise Representation**: All prices stored as integers (`1499900` paise = ₹14,999.00) in database constraints.
- **Atomic Transactions & Row Locking**: Prevents overselling when multiple customers attempt to purchase the last available saree.
- **Cryptographic Payment Verification**: Payment signatures verified with HMAC SHA256 before orders are confirmed.
- **Card Security**: Zero storage of debit/credit card numbers or CVVs on our servers.
