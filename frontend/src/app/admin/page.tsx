'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { FALLBACK_PRODUCTS } from '@/lib/api';
import { formatPrice, BRAND_INFO, SAREE_CATEGORIES } from '@/lib/constants';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'marketing' | 'settings'>('overview');
  const [productsList, setProductsList] = useState(FALLBACK_PRODUCTS);

  // Demo Orders State
  const [orders, setOrders] = useState([
    {
      id: 1,
      order_number: "MS-20261102-A89E4",
      customer_name: "Radhika Shetty",
      customer_email: "radhika.shetty@gmail.com",
      customer_phone: "9845123456",
      shipping_city: "Bengaluru, Karnataka",
      item_name: "Kanchipuram Crimson Royal Bridal Silk Saree",
      sku: "MS-KAN-001",
      total_amount_in_rupees: 21999,
      order_status: "CONFIRMED",
      payment_status: "PAID",
      date: "02 Nov 2026"
    },
    {
      id: 2,
      order_number: "MS-20261101-B42C1",
      customer_name: "Meera Pai",
      customer_email: "meera.pai@yahoo.com",
      customer_phone: "9741098765",
      shipping_city: "Mangalore, Karnataka",
      item_name: "Banarasi Katan Silk Deep Emerald Kadwa Weave Saree",
      sku: "MS-BAN-002",
      total_amount_in_rupees: 16999,
      order_status: "SHIPPED",
      payment_status: "PAID",
      date: "01 Nov 2026"
    },
    {
      id: 3,
      order_number: "MS-20261031-C77D9",
      customer_name: "Deepa Hegde",
      customer_email: "deepa.hegde@hotmail.com",
      customer_phone: "9900112233",
      shipping_city: "Mysuru, Karnataka",
      item_name: "Pastel Peach Soft Silk Festive Saree with Silver Zari",
      sku: "MS-SFT-003",
      total_amount_in_rupees: 6499,
      order_status: "DELIVERED",
      payment_status: "PAID",
      date: "31 Oct 2026"
    }
  ]);

  const handleUpdateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o));
  };

  const handleStockUpdate = (productId: number, delta: number) => {
    setProductsList(productsList.map(p => {
      if (p.id === productId) {
        const newQty = Math.max(0, p.stock_quantity + delta);
        return { ...p, stock_quantity: newQty, is_in_stock: newQty > 0 };
      }
      return p;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-cream gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-maroon-800 text-ivory">
              ADMIN CONTROL PANEL
            </span>
            <span className="text-xs text-darkbrown/60">Jakribettu, Bantwal</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-maroon-900 mt-1">Madhu Silks Boutique Manager</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 border border-cream rounded-lg text-xs font-semibold hover:bg-cream"
          >
            &larr; View Live Storefront
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-cream overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-maroon-800 text-maroon-900'
              : 'border-transparent text-darkbrown/70 hover:text-maroon-900'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-gold-600" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
            activeTab === 'products'
              ? 'border-maroon-800 text-maroon-900'
              : 'border-transparent text-darkbrown/70 hover:text-maroon-900'
          }`}
        >
          <Package className="w-4 h-4 text-gold-600" />
          <span>Saree Catalog ({productsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-maroon-800 text-maroon-900'
              : 'border-transparent text-darkbrown/70 hover:text-maroon-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-gold-600" />
          <span>Orders & Shipments ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('marketing')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
            activeTab === 'marketing'
              ? 'border-maroon-800 text-maroon-900'
              : 'border-transparent text-darkbrown/70 hover:text-maroon-900'
          }`}
        >
          <Tag className="w-4 h-4 text-gold-600" />
          <span>Coupons & Banners</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
            activeTab === 'settings'
              ? 'border-maroon-800 text-maroon-900'
              : 'border-transparent text-darkbrown/70 hover:text-maroon-900'
          }`}
        >
          <Settings className="w-4 h-4 text-gold-600" />
          <span>Boutique Settings</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-cream shadow-sm space-y-2">
              <span className="text-xs text-darkbrown/60 font-semibold uppercase tracking-wider">Total Revenue</span>
              <div className="font-serif text-2xl font-bold text-maroon-900">₹45,497</div>
              <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18% from last month</span>
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-cream shadow-sm space-y-2">
              <span className="text-xs text-darkbrown/60 font-semibold uppercase tracking-wider">Total Saree Orders</span>
              <div className="font-serif text-2xl font-bold text-maroon-900">{orders.length}</div>
              <p className="text-[11px] text-darkbrown/60">3 orders this week</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-cream shadow-sm space-y-2">
              <span className="text-xs text-darkbrown/60 font-semibold uppercase tracking-wider">Pending Dispatches</span>
              <div className="font-serif text-2xl font-bold text-gold-700">1</div>
              <p className="text-[11px] text-darkbrown/60">Jakribettu packing queue</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-cream shadow-sm space-y-2">
              <span className="text-xs text-darkbrown/60 font-semibold uppercase tracking-wider">Low Stock Sarees</span>
              <div className="font-serif text-2xl font-bold text-red-700">1</div>
              <p className="text-[11px] text-red-600 font-semibold">Restock recommended</p>
            </div>
          </div>

          {/* Recent Orders table snippet */}
          <div className="bg-white rounded-2xl border border-cream p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-cream">
              <h3 className="font-serif font-bold text-base text-maroon-950">Recent Customer Orders</h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-maroon-800 hover:underline"
              >
                View All Orders &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-cream text-darkbrown/60 uppercase">
                    <th className="py-2.5">Order ID</th>
                    <th className="py-2.5">Customer</th>
                    <th className="py-2.5">Saree</th>
                    <th className="py-2.5">Amount</th>
                    <th className="py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream/60">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-cream/20">
                      <td className="py-3 font-mono font-bold text-maroon-900">{ord.order_number}</td>
                      <td className="py-3">{ord.customer_name}</td>
                      <td className="py-3 max-w-xs truncate">{ord.item_name}</td>
                      <td className="py-3 font-bold">{formatPrice(ord.total_amount_in_rupees)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ord.order_status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                          ord.order_status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' : 'bg-gold-100 text-gold-900'
                        }`}>
                          {ord.order_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saree Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-maroon-950">
              Saree Inventory ({productsList.length} Drapes)
            </h2>
            <div className="text-xs text-darkbrown/60 italic">
              Strictly Sarees Only &bull; Prices in Paise
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-cream shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-cream/50 border-b border-cream text-darkbrown/70 uppercase">
                    <th className="p-3">Saree</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Available Stock</th>
                    <th className="p-3">Merchandising</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream/60">
                  {productsList.map((product) => {
                    const imgUrl = product.primary_image?.url || product.images?.[0]?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80";
                    return (
                      <tr key={product.id} className="hover:bg-cream/20">
                        <td className="p-3 flex items-center gap-3">
                          <div className="relative w-10 h-12 rounded overflow-hidden bg-cream shrink-0">
                            <Image src={imgUrl} alt={product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-maroon-950 block">{product.name}</span>
                            <span className="text-[11px] text-darkbrown/60">{product.fabric} &bull; {product.colour}</span>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-darkbrown/70">{product.sku}</td>
                        <td className="p-3">{product.category_name || product.saree_type}</td>
                        <td className="p-3 font-bold text-maroon-900">
                          {formatPrice(product.final_price_in_rupees)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStockUpdate(product.id, -1)}
                              className="w-5 h-5 rounded bg-cream flex items-center justify-center font-bold hover:bg-gold-200"
                            >
                              -
                            </button>
                            <span className={`font-bold ${product.stock_quantity <= 2 ? 'text-red-700' : 'text-darkbrown'}`}>
                              {product.stock_quantity}
                            </span>
                            <button
                              onClick={() => handleStockUpdate(product.id, 1)}
                              className="w-5 h-5 rounded bg-cream flex items-center justify-center font-bold hover:bg-gold-200"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3 space-x-1">
                          {product.is_featured && <span className="bg-maroon-100 text-maroon-800 text-[10px] px-1.5 py-0.5 rounded font-bold">Featured</span>}
                          {product.is_best_seller && <span className="bg-gold-100 text-gold-800 text-[10px] px-1.5 py-0.5 rounded font-bold">Bestseller</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Order Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="font-serif font-bold text-lg text-maroon-950">
            Customer Orders &amp; Shipment Status
          </h2>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white p-6 rounded-2xl border border-cream shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-cream gap-2">
                  <div>
                    <h3 className="font-mono font-bold text-sm text-maroon-900">{ord.order_number}</h3>
                    <p className="text-xs text-darkbrown/70">{ord.customer_name} &bull; {ord.customer_phone} &bull; {ord.customer_email}</p>
                    <p className="text-[11px] text-darkbrown/50">Shipping to: {ord.shipping_city}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-base text-maroon-950">{formatPrice(ord.total_amount_in_rupees)}</span>
                    <select
                      value={ord.order_status}
                      onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                      className="text-xs font-bold border border-cream rounded-lg p-1.5 bg-cream/40 focus:outline-none"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="PACKED">PACKED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-darkbrown/80">
                  <span>Item: <strong>{ord.item_name}</strong> ({ord.sku})</span>
                  <span>Payment: <strong className="text-emerald-700">{ord.payment_status}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Marketing & Coupons */}
      {activeTab === 'marketing' && (
        <div className="space-y-6">
          <h2 className="font-serif font-bold text-lg text-maroon-950">
            Promotional Offers &amp; Banners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-cream shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-maroon-900 border-b border-cream pb-2">
                Active Saree Coupons
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-cream/40 rounded-xl border border-cream flex justify-between items-center">
                  <div>
                    <span className="font-mono font-bold text-sm text-maroon-900 block">FESTIVE10</span>
                    <span className="text-darkbrown/70">10% discount on cart value above ₹5,000</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Active</span>
                </div>

                <div className="p-3 bg-cream/40 rounded-xl border border-cream flex justify-between items-center">
                  <div>
                    <span className="font-mono font-bold text-sm text-maroon-900 block">SILK500</span>
                    <span className="text-darkbrown/70">Flat ₹500 discount on cart value above ₹4,000</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-cream shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-maroon-900 border-b border-cream pb-2">
                Scheduled Festive Banners
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-cream/40 rounded-xl border border-cream">
                  <span className="font-bold text-maroon-950 block">Diwali &amp; Dussehra Festive Saree Edit</span>
                  <span className="text-darkbrown/70">Displayed on homepage hero carousel &bull; Target: /festive</span>
                </div>
                <div className="p-3 bg-cream/40 rounded-xl border border-cream">
                  <span className="font-bold text-maroon-950 block">Grand Bridal Trousseau Banner</span>
                  <span className="text-darkbrown/70">Featured bridal section banner &bull; Target: /bridal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Boutique Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cream shadow-sm space-y-6 max-w-2xl">
          <h2 className="font-serif font-bold text-lg text-maroon-950 border-b border-cream pb-2">
            Madhu Silks Official Business Settings
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-darkbrown block mb-1">Brand Name</label>
              <input type="text" readOnly value={BRAND_INFO.name} className="w-full p-2 bg-cream/40 border border-cream rounded-lg" />
            </div>

            <div>
              <label className="font-bold text-darkbrown block mb-1">Brand Tagline</label>
              <input type="text" readOnly value={BRAND_INFO.tagline} className="w-full p-2 bg-cream/40 border border-cream rounded-lg" />
            </div>

            <div>
              <label className="font-bold text-darkbrown block mb-1">Verified Shop Address</label>
              <input type="text" readOnly value={BRAND_INFO.address} className="w-full p-2 bg-cream/40 border border-cream rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-darkbrown block mb-1">Contact Phone</label>
                <input type="text" readOnly value={BRAND_INFO.phoneFormatted} className="w-full p-2 bg-cream/40 border border-cream rounded-lg" />
              </div>
              <div>
                <label className="font-bold text-darkbrown block mb-1">WhatsApp Ordering Number</label>
                <input type="text" readOnly value={BRAND_INFO.whatsappFormatted} className="w-full p-2 bg-cream/40 border border-cream rounded-lg" />
              </div>
            </div>

            <div>
              <label className="font-bold text-darkbrown block mb-1">Official Instagram</label>
              <input type="text" readOnly value={BRAND_INFO.instagram} className="w-full p-2 bg-cream/40 border border-cream rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
