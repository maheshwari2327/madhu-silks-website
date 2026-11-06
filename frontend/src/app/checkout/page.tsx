'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Tag, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice, BRAND_INFO } from '@/lib/constants';

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getShippingCharges = useCartStore((state) => state.getShippingCharges);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const discountRupees = useCartStore((state) => state.discountRupees);
  const couponCode = useCartStore((state) => state.couponCode);

  const subtotal = getSubtotal();
  const shipping = getShippingCharges();
  const total = getTotal();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    landmark: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    delivery_notes: '',
    payment_method: 'RAZORPAY', // 'RAZORPAY' or 'WHATSAPP'
  });

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const indianStates = [
    'Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana',
    'Maharashtra', 'Goa', 'Gujarat', 'Delhi', 'Rajasthan', 'West Bengal',
    'Uttar Pradesh', 'Madhya Pradesh', 'Punjab', 'Haryana', 'Bihar', 'Odisha',
    'Assam', 'Other State / UT'
  ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = inputCoupon.trim().toUpperCase();

    if (code === 'FESTIVE10') {
      if (subtotal < 5000) {
        setCouponError('Coupon FESTIVE10 requires a minimum order of ₹5,000.');
        return;
      }
      const disc = Math.round(subtotal * 0.1);
      applyCoupon('FESTIVE10', disc);
      setCouponSuccess(`Coupon FESTIVE10 applied! You saved ${formatPrice(disc)}.`);
    } else if (code === 'SILK500') {
      if (subtotal < 4000) {
        setCouponError('Coupon SILK500 requires a minimum order of ₹4,000.');
        return;
      }
      applyCoupon('SILK500', 500);
      setCouponSuccess(`Coupon SILK500 applied! You saved ₹500.`);
    } else {
      setCouponError('Invalid coupon code. Try FESTIVE10 or SILK500.');
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required.';
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) errs.phone = 'Valid 10-digit phone number is required.';
    if (!formData.address_line_1.trim()) errs.address_line_1 = 'House/Apartment & Street address is required.';
    if (!formData.city.trim()) errs.city = 'City/Town is required.';
    if (!/^\d{6}$/.test(formData.pincode.trim())) errs.pincode = 'Valid 6-digit Indian PIN code is required.';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      // Generate unique mock order number
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
      const generatedOrderNumber = `MS-${datePart}-${randomPart}`;

      // Simulate order processing & backend transaction
      setTimeout(() => {
        // Save order details to localStorage for confirmation page retrieval
        const orderSnapshot = {
          order_number: generatedOrderNumber,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: `${formData.address_line_1}, ${formData.address_line_2 ? formData.address_line_2 + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}`,
          total_amount_in_rupees: total,
          subtotal_in_rupees: subtotal,
          discount_in_rupees: discountRupees,
          shipping_in_rupees: shipping,
          payment_method: formData.payment_method,
          payment_status: formData.payment_method === 'RAZORPAY' ? 'PAID' : 'PENDING_WHATSAPP',
          order_status: 'CONFIRMED',
          items: items.map(item => ({
            product_name: item.product.name,
            product_sku: item.product.sku,
            quantity: item.quantity,
            total_price_in_rupees: item.total_price_in_rupees
          })),
          created_at: new Date().toISOString()
        };

        if (typeof window !== 'undefined') {
          sessionStorage.setItem(`order_${generatedOrderNumber}`, JSON.stringify(orderSnapshot));
        }

        clearCart();
        setIsSubmitting(false);
        router.push(`/order-confirmation/${generatedOrderNumber}`);
      }, 800);
    } catch (err) {
      setIsSubmitting(false);
      alert('An error occurred during order creation. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-maroon-900">Your shopping bag is empty.</h1>
        <p className="text-xs text-darkbrown/60">Please add sarees to your bag before proceeding to checkout.</p>
        <Link href="/collections" className="inline-block px-6 py-2.5 bg-maroon-800 text-ivory rounded-lg text-xs font-bold">
          Browse Sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-maroon-900">Checkout</h1>
        <p className="text-xs text-darkbrown/60 mt-1">Provide your delivery details to complete your authentic saree purchase.</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Customer & Address Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Details */}
          <div className="bg-white p-6 rounded-xl border border-cream space-y-4 shadow-sm">
            <h2 className="font-serif font-bold text-base text-maroon-900 border-b border-cream pb-2">
              1. Customer Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkbrown">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Shetty"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-xs ${formErrors.name ? 'border-red-500' : 'border-cream'} focus:outline-none focus:ring-1 focus:ring-gold-500`}
                />
                {formErrors.name && <span className="text-[10px] text-red-600">{formErrors.name}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkbrown">WhatsApp / Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-xs ${formErrors.phone ? 'border-red-500' : 'border-cream'} focus:outline-none focus:ring-1 focus:ring-gold-500`}
                />
                {formErrors.phone && <span className="text-[10px] text-red-600">{formErrors.phone}</span>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-darkbrown">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="For order confirmation & shipping invoice"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-xs ${formErrors.email ? 'border-red-500' : 'border-cream'} focus:outline-none focus:ring-1 focus:ring-gold-500`}
                />
                {formErrors.email && <span className="text-[10px] text-red-600">{formErrors.email}</span>}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-xl border border-cream space-y-4 shadow-sm">
            <h2 className="font-serif font-bold text-base text-maroon-900 border-b border-cream pb-2">
              2. Shipping Address in India
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-darkbrown">Flat, House No., Building, Apartment *</label>
                <input
                  type="text"
                  required
                  placeholder="House number, apartment name"
                  value={formData.address_line_1}
                  onChange={(e) => setFormData({ ...formData, address_line_1: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-xs ${formErrors.address_line_1 ? 'border-red-500' : 'border-cream'} focus:outline-none focus:ring-1 focus:ring-gold-500`}
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-darkbrown">Street, Sector, Area</label>
                <input
                  type="text"
                  placeholder="Street name or locality"
                  value={formData.address_line_2}
                  onChange={(e) => setFormData({ ...formData, address_line_2: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkbrown">Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Near Temple / Hospital"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkbrown">City / Town *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bantwal, Mangalore, Bangalore"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-xs ${formErrors.city ? 'border-red-500' : 'border-cream'} focus:outline-none`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkbrown">State *</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg text-xs bg-white focus:outline-none"
                >
                  {indianStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkbrown">PIN Code *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="6-digit Indian PIN code"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-xs ${formErrors.pincode ? 'border-red-500' : 'border-cream'} focus:outline-none`}
                />
                {formErrors.pincode && <span className="text-[10px] text-red-600">{formErrors.pincode}</span>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-darkbrown">Delivery Notes / Special Instructions</label>
                <textarea
                  rows={2}
                  placeholder="Any specific instructions for saree packing or safe delivery"
                  value={formData.delivery_notes}
                  onChange={(e) => setFormData({ ...formData, delivery_notes: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Selection */}
          <div className="bg-white p-6 rounded-xl border border-cream space-y-4 shadow-sm">
            <h2 className="font-serif font-bold text-base text-maroon-900 border-b border-cream pb-2">
              3. Payment Selection
            </h2>

            <div className="space-y-3">
              <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                formData.payment_method === 'RAZORPAY' ? 'border-maroon-800 bg-maroon-50/30' : 'border-cream hover:bg-cream/20'
              }`}>
                <input
                  type="radio"
                  name="payment_method"
                  value="RAZORPAY"
                  checked={formData.payment_method === 'RAZORPAY'}
                  onChange={() => setFormData({ ...formData, payment_method: 'RAZORPAY' })}
                  className="mt-1 text-maroon-800 focus:ring-maroon-800"
                />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-maroon-900 flex items-center gap-2">
                    <span>Razorpay Secure Online Payment</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Fast & Protected</span>
                  </div>
                  <p className="text-xs text-darkbrown/70 mt-1">
                    Pay securely using Google Pay, PhonePe, Paytm, UPI, Credit Card, Debit Card, or Net Banking.
                  </p>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                formData.payment_method === 'WHATSAPP' ? 'border-maroon-800 bg-maroon-50/30' : 'border-cream hover:bg-cream/20'
              }`}>
                <input
                  type="radio"
                  name="payment_method"
                  value="WHATSAPP"
                  checked={formData.payment_method === 'WHATSAPP'}
                  onChange={() => setFormData({ ...formData, payment_method: 'WHATSAPP' })}
                  className="mt-1 text-maroon-800 focus:ring-maroon-800"
                />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-maroon-900 flex items-center gap-2">
                    <span>Direct WhatsApp Boutique Confirmation</span>
                  </div>
                  <p className="text-xs text-darkbrown/70 mt-1">
                    Hold this saree order and finalize payment details directly with our Jakribettu shop team on WhatsApp (8749090701).
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary & Final Button */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-cream space-y-4 shadow-sm">
            <h2 className="font-serif font-bold text-base text-maroon-950 border-b border-cream pb-3">
              Order Summary ({items.length} {items.length === 1 ? 'Saree' : 'Sarees'})
            </h2>

            {/* Items snippet */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-cream/60">
              {items.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex justify-between text-xs">
                  <div>
                    <span className="font-semibold text-maroon-950 block">{item.product.name}</span>
                    <span className="text-darkbrown/50">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-darkbrown">
                    {formatPrice(item.total_price_in_rupees)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-3 border-t border-cream space-y-2">
              <label className="text-xs font-semibold text-darkbrown flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-gold-600" />
                <span>Have a Promotional Code?</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. FESTIVE10"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-grow px-3 py-1.5 border border-cream rounded-lg text-xs uppercase focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-1.5 bg-maroon-800 text-ivory rounded-lg text-xs font-bold hover:bg-maroon-900 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[10px] text-red-600">{couponError}</p>}
              {couponSuccess && <p className="text-[10px] text-emerald-700 font-semibold">{couponSuccess}</p>}
            </div>

            {/* Totals Calculation */}
            <div className="pt-3 border-t border-cream space-y-2 text-xs">
              <div className="flex justify-between text-darkbrown/70">
                <span>Items Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-darkbrown/70">
                <span>Shipping across India</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shipping)}</span>
              </div>
              {discountRupees > 0 && (
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Coupon Discount ({couponCode})</span>
                  <span>-{formatPrice(discountRupees)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-cream flex justify-between text-sm sm:text-base font-bold text-maroon-950">
                <span>Total Amount</span>
                <span className="text-maroon-900 font-serif text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold text-sm text-center shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Processing Order...' : `Place Order & Pay ${formatPrice(total)}`}</span>
            </button>

            <div className="text-[11px] text-center text-darkbrown/60 space-y-1">
              <p className="flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Safe & Encrypted Checkout</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

