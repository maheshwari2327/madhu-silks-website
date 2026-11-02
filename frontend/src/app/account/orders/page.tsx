'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Truck, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPrice, BRAND_INFO } from '@/lib/constants';

export default function CustomerOrdersPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Mock past customer order
  const orders = [
    {
      order_number: "MS-20261102-A89E4",
      date: "02 November 2026",
      status: "CONFIRMED",
      payment_status: "PAID",
      total: 21999,
      item: "Kanchipuram Crimson Royal Bridal Silk Saree",
      sku: "MS-KAN-001",
      quantity: 1,
      estimated_delivery: "05 November 2026",
      courier: "Express Air (Jakribettu Hub)"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream">
        <div>
          <h1 className="font-serif text-3xl font-bold text-maroon-900">My Orders</h1>
          <p className="text-xs text-darkbrown/60 mt-1">
            Signed in as <strong>{user?.email || 'customer@example.com'}</strong>
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/account/wishlist" className="px-4 py-2 border border-cream rounded-lg text-xs font-semibold hover:bg-cream">
            Saved Sarees
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 bg-cream text-maroon-900 rounded-lg text-xs font-semibold hover:bg-maroon-100"
          >
            Sign Out
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-cream p-8 space-y-3">
          <Package className="w-10 h-10 text-gold-600 mx-auto" />
          <h2 className="font-serif font-bold text-lg text-maroon-900">No orders placed yet.</h2>
          <p className="text-xs text-darkbrown/60">Discover our authentic Kanchipuram and Banarasi sarees.</p>
          <Link href="/collections" className="inline-block mt-2 px-6 py-2.5 bg-maroon-800 text-ivory rounded-lg text-xs font-bold">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div key={ord.order_number} className="bg-white rounded-2xl border border-cream p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cream gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gold-700 tracking-wider">Order ID</span>
                  <h3 className="font-mono font-bold text-sm text-maroon-950">{ord.order_number}</h3>
                  <span className="text-[11px] text-darkbrown/60">Placed on {ord.date}</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{ord.status} &bull; {ord.payment_status}</span>
                  </span>
                  <div className="font-serif font-bold text-lg text-maroon-900 mt-1">
                    {formatPrice(ord.total)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-bold text-sm text-maroon-900">{ord.item}</h4>
                  <p className="text-darkbrown/60">SKU: {ord.sku} &bull; Quantity: {ord.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-darkbrown/80 flex items-center gap-1 justify-end">
                    <Truck className="w-3.5 h-3.5 text-gold-600" />
                    <span>Est. Delivery: {ord.estimated_delivery}</span>
                  </p>
                  <p className="text-[10px] text-darkbrown/50">{ord.courier}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-cream flex justify-between items-center text-xs">
                <a
                  href={`https://wa.me/91${BRAND_INFO.whatsapp}?text=${encodeURIComponent(`Hello Madhu Silks, please share tracking details for order ${ord.order_number}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#128C7E] hover:underline"
                >
                  Track on WhatsApp (8749090701) &rarr;
                </a>
                <Link href={`/order-confirmation/${ord.order_number}`} className="font-semibold text-maroon-800 hover:underline">
                  View Full Invoice &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
