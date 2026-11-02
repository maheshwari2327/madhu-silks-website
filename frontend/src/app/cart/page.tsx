'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/constants';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getShippingCharges = useCartStore((state) => state.getShippingCharges);
  const getTotal = useCartStore((state) => state.getTotal);
  const discountRupees = useCartStore((state) => state.discountRupees);

  const subtotal = getSubtotal();
  const shipping = getShippingCharges();
  const total = getTotal();

  const freeShippingThreshold = 3000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center text-maroon-800">
          <ShoppingBag className="w-10 h-10 text-gold-600" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-maroon-900">Your Shopping Bag is Empty</h1>
        <p className="text-sm text-darkbrown/70 max-w-md mx-auto">
          Explore our collection of authentic Kanchipuram, Banarasi, and Soft Silk sarees from Jakribettu, Bantwal.
        </p>
        <div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-maroon-800 hover:bg-maroon-900 text-ivory font-bold text-sm tracking-wide shadow-md transition-colors"
          >
            <span>Explore Saree Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-maroon-900">Your Shopping Bag</h1>
        <p className="text-xs text-darkbrown/60 mt-1">Review your selected authentic sarees before continuing to checkout.</p>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-white p-4 rounded-xl border border-cream shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-maroon-900">
            <Truck className="w-4 h-4 text-gold-600" />
            {amountNeededForFreeShipping > 0
              ? `Add ${formatPrice(amountNeededForFreeShipping)} more for FREE Express Shipping across India!`
              : "🎉 Congratulations! You have unlocked FREE Express Shipping!"}
          </span>
          <span className="text-gold-700 font-bold">{Math.round(progressToFreeShipping)}%</span>
        </div>
        <div className="w-full bg-cream h-2 rounded-full overflow-hidden">
          <div
            className="bg-gold-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Grid: Cart Items List + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-cream divide-y divide-cream shadow-sm overflow-hidden">
            {items.map((item) => {
              const primaryImg = item.product.primary_image?.url || item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80";

              return (
                <div key={item.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-start">
                  <div className="relative w-20 sm:w-28 aspect-[3/4] rounded-lg overflow-hidden bg-cream shrink-0">
                    <Image
                      src={primaryImg}
                      alt={item.product.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-grow space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-darkbrown/60 uppercase tracking-wider font-semibold">
                          SKU: {item.product.sku}
                        </span>
                        <Link href={`/products/${item.product.slug}`} className="block">
                          <h3 className="font-serif font-bold text-sm sm:text-base text-maroon-950 hover:text-gold-700 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-darkbrown/60 mt-0.5">
                          {item.product.fabric} &bull; {item.product.colour}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-darkbrown/40 hover:text-red-700 transition-colors"
                        title="Remove Saree"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-cream rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-darkbrown hover:bg-cream"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-darkbrown hover:bg-cream"
                          disabled={item.quantity >= item.product.stock_quantity}
                        >
                          +
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="text-right">
                        <span className="font-serif font-bold text-sm sm:text-base text-maroon-900">
                          {formatPrice(item.total_price_in_rupees)}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-darkbrown/50">
                            {formatPrice(item.unit_price_in_rupees)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link href="/collections" className="text-xs font-semibold text-maroon-800 hover:text-gold-600">
              &larr; Continue Saree Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="bg-white p-6 rounded-xl border border-cream space-y-6 shadow-sm">
          <h2 className="font-serif font-bold text-lg text-maroon-950 pb-3 border-b border-cream">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-darkbrown/80">
              <span>Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-darkbrown/80">
              <span>Shipping Charges</span>
              <span className="font-semibold">
                {shipping === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatPrice(shipping)}
              </span>
            </div>

            {discountRupees > 0 && (
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Festive Coupon Discount</span>
                <span>-{formatPrice(discountRupees)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-cream flex justify-between text-sm sm:text-base font-bold text-maroon-950">
              <span>Final Payable Amount</span>
              <span className="text-maroon-900 font-serif text-lg">{formatPrice(total)}</span>
            </div>
            <p className="text-[10px] text-darkbrown/50 text-right">Applicable GST included</p>
          </div>

          <Link
            href="/checkout"
            className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold text-sm text-center shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="pt-2 border-t border-cream text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-[11px] text-darkbrown/70 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Verified Saree Guarantee &bull; Razorpay Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
