import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { BRAND_INFO, SAREE_CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-maroon-950 text-cream/90 pt-16 pb-8 border-t border-gold-900/40">
      {/* Value Proposition Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-maroon-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-maroon-900/80 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-ivory text-base">Authentic Sarees Only</h4>
              <p className="text-xs text-cream/70 mt-1">Specialist saree retailer. Every weave inspected with care.</p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-maroon-900/80 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-ivory text-base">All-India Delivery</h4>
              <p className="text-xs text-cream/70 mt-1">Free express shipping on all orders above ₹3,000.</p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-maroon-900/80 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-ivory text-base">Secure Razorpay Payments</h4>
              <p className="text-xs text-cream/70 mt-1">UPI, Credit/Debit cards & Net Banking with 256-bit encryption.</p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-maroon-900/80 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-ivory text-base">Personalized Assistance</h4>
              <p className="text-xs text-cream/70 mt-1">Direct video consultations & WhatsApp ordering support.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-maroon-800 border border-gold-400 flex items-center justify-center text-gold-300 font-serif font-bold text-sm">
                MS
              </div>
              <h3 className="font-serif text-2xl font-bold text-ivory">Madhu Silks</h3>
            </div>
            <p className="text-xs uppercase tracking-widest text-gold-400 font-medium">
              Tradition Woven Into Every Thread
            </p>
            <p className="text-sm text-cream/80 max-w-sm leading-relaxed">
              Based in Jakribettu, Bantwal, Karnataka, Madhu Silks is dedicated exclusively to timeless Indian sarees. From ceremonial Kanchipuram wedding silks to breezy soft silks, we honor South India&apos;s rich weaving heritage.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-maroon-900 flex items-center justify-center text-gold-300 hover:bg-gold-500 hover:text-maroon-950 transition-colors"
                aria-label="Madhu Silks Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/91${BRAND_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-700/80 hover:bg-green-700 text-ivory text-xs font-medium transition-colors"
              >
                <span>WhatsApp: {BRAND_INFO.whatsappFormatted}</span>
              </a>
            </div>
          </div>

          {/* Saree Categories */}
          <div>
            <h4 className="font-serif font-semibold text-ivory text-sm tracking-wider uppercase border-b border-gold-500/30 pb-2 mb-4">
              Saree Collections
            </h4>
            <ul className="space-y-2 text-sm text-cream/80">
              {SAREE_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/collections/${cat.slug}`} className="hover:text-gold-300 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/collections" className="text-gold-400 hover:underline">
                  View All Sarees &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div>
            <h4 className="font-serif font-semibold text-ivory text-sm tracking-wider uppercase border-b border-gold-500/30 pb-2 mb-4">
              Policies & Help
            </h4>
            <ul className="space-y-2 text-sm text-cream/80">
              <li>
                <Link href="/shipping-policy" className="hover:text-gold-300 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-refund-policy" className="hover:text-gold-300 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gold-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-gold-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-gold-300 transition-colors">
                  Track My Order
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About Our Brand
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutique Visit & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-ivory text-sm tracking-wider uppercase border-b border-gold-500/30 pb-2 mb-4">
              Shop Address
            </h4>
            <div className="flex items-start gap-3 text-sm text-cream/80">
              <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <span>{BRAND_INFO.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-cream/80">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <a href={`tel:${BRAND_INFO.phone}`} className="hover:text-gold-300">
                {BRAND_INFO.phoneFormatted}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-cream/80">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-gold-300 break-all">
                {BRAND_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Local SEO Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-maroon-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-4">
        <p>
          &copy; {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved. Jakribettu, Bantwal, Karnataka, India.
        </p>
        <p className="text-center sm:text-right">
          Exclusively authentic Indian sarees &bull; Built with pride in Karnataka.
        </p>
      </div>
    </footer>
  );
}

