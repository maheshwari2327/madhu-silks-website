import React from 'react';
import Link from 'next/link';
import { Truck, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { BRAND_INFO } from '@/lib/constants';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs text-darkbrown/60 mt-1">
          Last updated: November 2026 &bull; Madhu Silks, Jakribettu, Bantwal, Karnataka
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-cream shadow-sm space-y-6 text-xs sm:text-sm text-darkbrown/80 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950 flex items-center gap-2">
            <Truck className="w-4 h-4 text-gold-600" />
            <span>1. All-India Shipping Coverage</span>
          </h2>
          <p>
            Madhu Silks delivers exclusively authentic sarees to all serviceable postal PIN codes across India. All shipments originate from our central boutique and quality inspection facility located at <strong>Jakribettu, Bantwal, Karnataka, India</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold-600" />
            <span>2. Processing and Dispatch Timeline</span>
          </h2>
          <p>
            Each saree undergoes a thorough 3-point inspection (fabric check, zari density inspection, and fall/edging verification) before dispatch:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-darkbrown/70">
            <li>Standard in-stock sarees are dispatched within <strong>24 to 48 hours</strong> of order verification.</li>
            <li>Customized tasseling or boutique fall/pico service adds 1 additional business day.</li>
            <li>Orders placed on Sundays or public holidays are processed on the subsequent working day.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">3. Estimated Transit Times</h2>
          <p>Once dispatched with our express logistics partners (Bluedart, Delhivery, DTDC):</p>
          <div className="p-4 bg-cream/40 rounded-xl space-y-2 text-xs">
            <p><strong>Karnataka (Bengaluru, Mangaluru, Mysuru, Hubballi):</strong> 2 to 3 business days.</p>
            <p><strong>South India (Tamil Nadu, Kerala, Andhra Pradesh, Telangana):</strong> 3 to 4 business days.</p>
            <p><strong>Western, Northern & Eastern India:</strong> 4 to 6 business days.</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">4. Shipping Charges</h2>
          <ul className="list-disc pl-5 space-y-1 text-darkbrown/70">
            <li><strong>FREE Express Delivery:</strong> Automatically applied to all domestic orders with a cart total of ₹3,000 or above.</li>
            <li><strong>Standard Express Shipping:</strong> A flat delivery charge of ₹150 applies to orders below ₹3,000.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">5. Shipment Tracking</h2>
          <p>
            Immediately upon dispatch, you will receive an automated notification containing your courier tracking number (AWB) and live status link via email and WhatsApp. You may also track directly by messaging our team on WhatsApp at <strong>8749090701</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

