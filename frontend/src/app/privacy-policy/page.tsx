import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';
import { BRAND_INFO } from '@/lib/constants';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-darkbrown/60 mt-1">
          Last updated: November 2026 &bull; Madhu Silks, Jakribettu, Bantwal, Karnataka
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-cream shadow-sm space-y-6 text-xs sm:text-sm text-darkbrown/80 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>1. Our Privacy Commitment</span>
          </h2>
          <p>
            Madhu Silks (&ldquo;we&rdquo;, &ldquo;our&rdquo;) values your trust. This Privacy Policy details how we handle and protect customer personal data collected via our website and official WhatsApp business interactions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1 text-darkbrown/70">
            <li><strong>Delivery Details:</strong> Name, shipping address, PIN code, contact phone number, and email address required to deliver your sarees.</li>
            <li><strong>Order Records:</strong> Purchase history, order timestamps, and communication preferences.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gold-600" />
            <span>3. Strict Non-Storage of Payment Information</span>
          </h2>
          <p>
            Madhu Silks <strong>never stores, sees, or processes</strong> full credit card numbers, debit card details, or CVV codes. All digital transactions are securely tokenized and handled directly through <strong>Razorpay</strong> under RBI compliance and PCI-DSS Level 1 standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">4. Sharing with Service Providers</h2>
          <p>
            We only share minimal shipping information (name, address, phone number) with verified logistics partners (Shiprocket, Bluedart, Delhivery) strictly to complete your delivery. We do not sell, rent, or trade your personal information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">5. Contact Our Privacy Officer</h2>
          <p>
            For privacy inquiries or to request data removal: Email <strong>{BRAND_INFO.email}</strong> or write to <strong>Madhu Silks, Jakribettu, Bantwal, Karnataka, India</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
