import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '@/lib/constants';

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-darkbrown/60 mt-1">
          Last updated: November 2026 &bull; Madhu Silks, Jakribettu, Bantwal, Karnataka
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-cream shadow-sm space-y-6 text-xs sm:text-sm text-darkbrown/80 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gold-600" />
            <span>1. Terms Overview</span>
          </h2>
          <p>
            Welcome to Madhu Silks. By browsing, placing orders, or using this website, you agree to comply with and be bound by the following terms of service. Madhu Silks operates exclusively as an Indian saree retailer based in Jakribettu, Bantwal, Karnataka.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">2. Product Descriptions and Color Accuracy</h2>
          <p>
            We strive to display the colours, intricate zari work, and drape textures of our sarees with maximal fidelity. However, because pure zari and natural silk fibers reflect ambient lighting dynamically, minor variations in shade may occur between studio photography and natural ambient light.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">3. Handloom Nuances</h2>
          <p>
            Authentic handloom sarees (such as Korvai Kanchipurams and pitloom weaves) are crafted manually by master weavers. Slight irregularities in the selvedge, zari knotting, or warp threads are characteristic hallmarks of human artisanal craftsmanship, not manufactured flaws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">4. Pricing and Payment Verification</h2>
          <p>
            All prices are stated in Indian Rupees (₹) and include applicable taxes. We reserve the right to correct rare typographical errors. Orders are confirmed only upon successful verification of payment via our integrated Razorpay payment gateway or direct boutique confirmation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-maroon-950">5. Governing Law and Jurisdiction</h2>
          <p>
            These terms are governed by the laws of Karnataka and India. Any disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the competent courts in Bantwal / Dakshina Kannada, Karnataka.
          </p>
        </section>
      </div>
    </div>
  );
}

