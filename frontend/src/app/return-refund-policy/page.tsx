import React from 'react';
import Link from 'next/link';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { BRAND_INFO } from '@/lib/constants';

export default function ReturnRefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
          Return &amp; Refund Policy
        </h1>
        <p className="text-xs text-darkbrown/60 mt-1">
          Last updated: November 2026 &bull; Madhu Silks, Jakribettu, Bantwal, Karnataka
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-cream shadow-sm space-y-6 text-xs sm:text-sm text-darkbrown/80 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-gold-600" />
            <span>1. Commitment to Quality and Authenticity</span>
          </h2>
          <p>
            At Madhu Silks, we honor the emotional significance of every saree purchase. Before packing, our master inspectors verify each piece for weave consistency, thread perfection, and correct zari patterns.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">2. Eligibility for Returns</h2>
          <p>
            We accept return requests under the following conditions within <strong>7 days</strong> of delivery:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-darkbrown/70">
            <li>The saree received has an unstitched weaving defect or structural flaw.</li>
            <li>The item received differs substantially from the verified order specification.</li>
            <li>The saree remains unused, unwashed, and in original pristine folds with all tags intact.</li>
            <li>The running blouse piece has <strong>not</strong> been detached, cut, or stitched.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">3. Return Request Process</h2>
          <p>
            To initiate a return, notify our Jakribettu team within 7 days of delivery:
          </p>
          <div className="p-4 bg-cream/40 rounded-xl space-y-2 text-xs">
            <p><strong>Via WhatsApp:</strong> Send photos of the saree along with your Order ID to <strong>8749090701</strong>.</p>
            <p><strong>Via Email:</strong> Email <strong>{BRAND_INFO.email}</strong> with your order invoice.</p>
          </div>
          <p className="text-xs text-darkbrown/60">
            Upon approval, our team will schedule a complimentary return pickup through our courier partners.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">4. Refund Processing</h2>
          <p>
            Once the returned saree is safely received and inspected at our Jakribettu workshop:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-darkbrown/70">
            <li>Refunds are initiated via the <strong>Razorpay Refund API</strong> directly to your original payment method (Bank account, UPI, or Credit/Debit Card).</li>
            <li>Banking institutions typically reflect the refunded amount within <strong>5 to 7 business days</strong>.</li>
            <li>You will receive a Razorpay refund reference ID for real-time tracking with your bank.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

