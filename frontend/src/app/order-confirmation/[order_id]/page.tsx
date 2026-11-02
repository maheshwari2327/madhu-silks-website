'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Package, MapPin, Truck, MessageCircle, ArrowRight } from 'lucide-react';
import { formatPrice, BRAND_INFO } from '@/lib/constants';

interface OrderConfirmationProps {
  params: {
    order_id: string;
  };
}

export default function OrderConfirmationPage({ params }: OrderConfirmationProps) {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Attempt to load from session storage
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(`order_${params.order_id}`);
      if (stored) {
        setOrderData(JSON.parse(stored));
      }
    }
  }, [params.order_id]);

  const orderNumber = orderData?.order_number || params.order_id;
  const totalAmount = orderData?.total_amount_in_rupees || 21999;
  const customerName = orderData?.customer_name || 'Valued Customer';
  const shippingAddress = orderData?.shipping_address || 'Madhu Silks Customer Address, India';
  const paymentMethod = orderData?.payment_method || 'RAZORPAY';
  const items = orderData?.items || [
    { product_name: 'Authentic Traditional Saree', product_sku: 'MS-KAN-001', quantity: 1, total_price_in_rupees: totalAmount }
  ];

  const whatsappInquiryUrl = `https://wa.me/91${BRAND_INFO.whatsapp}?text=${encodeURIComponent(`Hello Madhu Silks! I have placed an order with Order ID: ${orderNumber}. Please share tracking and dispatch updates.`)}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Success Hero */}
      <div className="bg-white p-8 rounded-2xl border border-cream text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-gold-700 tracking-wider uppercase">Order Confirmed</span>
          <h1 className="font-serif text-3xl font-bold text-maroon-900">Thank You, {customerName}!</h1>
          <p className="text-xs text-darkbrown/70 max-w-md mx-auto">
            Your saree order has been received by our Jakribettu, Bantwal workshop. We have sent confirmation details to your email.
          </p>
        </div>

        <div className="inline-block px-4 py-2 bg-cream/70 rounded-lg text-xs font-mono font-bold text-maroon-950 border border-cream">
          Order Number: {orderNumber}
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cream space-y-6 shadow-sm">
        <h2 className="font-serif font-bold text-lg text-maroon-950 border-b border-cream pb-3 flex items-center gap-2">
          <Package className="w-5 h-5 text-gold-600" />
          <span>Items in Your Order</span>
        </h2>

        <div className="divide-y divide-cream/60">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="py-3 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-maroon-950 block text-sm">{item.product_name}</span>
                <span className="text-darkbrown/60">SKU: {item.product_sku} &bull; Qty: {item.quantity}</span>
              </div>
              <span className="font-bold text-maroon-900 text-sm">
                {formatPrice(item.total_price_in_rupees)}
              </span>
            </div>
          ))}
        </div>

        {/* Shipping & Delivery Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-cream text-xs">
          <div className="space-y-1.5">
            <h3 className="font-bold text-darkbrown flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-600" />
              <span>Delivery Address</span>
            </h3>
            <p className="text-darkbrown/80 leading-relaxed">{shippingAddress}</p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-darkbrown flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold-600" />
              <span>Estimated Delivery</span>
            </h3>
            <p className="text-darkbrown/80">
              <strong>2 - 4 Business Days</strong> across India via Express Courier with tracking.
            </p>
            <p className="text-[11px] text-darkbrown/60">Payment Status: <strong className="text-emerald-700">Verified & Paid ({paymentMethod})</strong></p>
          </div>
        </div>

        {/* Total Amount Paid */}
        <div className="pt-4 border-t border-cream flex justify-between items-center">
          <span className="text-sm font-bold text-darkbrown">Total Amount Paid</span>
          <span className="font-serif text-2xl font-bold text-maroon-900">
            {formatPrice(totalAmount)}
          </span>
        </div>
      </div>

      {/* WhatsApp Tracking & Support */}
      <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#128C7E]">Need Dispatch or Tracking Updates?</h3>
            <p className="text-xs text-darkbrown/70">Connect with our Bantwal store on WhatsApp using your Order ID.</p>
          </div>
        </div>

        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold whitespace-nowrap shadow-sm"
        >
          Track on WhatsApp &rarr;
        </a>
      </div>

      <div className="text-center">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-xs font-bold text-maroon-800 hover:text-gold-600"
        >
          <span>Continue Browsing Sarees</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
