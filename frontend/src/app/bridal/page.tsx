import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { BRAND_INFO } from '@/lib/constants';

export default async function BridalPage() {
  const allProducts = await fetchProducts();
  const bridalProducts = allProducts.filter(
    (p) => p.category_slug === 'bridal' || p.occasion.toLowerCase().includes('bridal') || p.category_slug === 'kanchipuram-silk'
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Bridal Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-maroon-950 text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
            alt="Madhu Silks Bridal Trousseau Sarees"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-widest border border-gold-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grand Bridal Trousseau</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight text-ivory">
            Auspicious Drapes for Your Sacred Muhurtham
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Curated heirloom bridal sarees in auspicious crimson red, vermilion, deep maroon and antique gold zari. Woven to accompany you through unforgettable vows.
          </p>
        </div>
      </section>

      {/* Bridal Consultation Highlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream/50 rounded-xl p-6 border border-cream flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-maroon-100 text-maroon-800 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-maroon-900">Personalized Bridal Video Consultation</h3>
              <p className="text-xs text-darkbrown/70">Connect with our Bantwal boutique team via WhatsApp to view the zari and borders live.</p>
            </div>
          </div>
          <a
            href={`https://wa.me/91${BRAND_INFO.whatsapp}?text=${encodeURIComponent("Hello Madhu Silks! I am looking for bridal sarees and would like to schedule a video call consultation.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-maroon-800 hover:bg-maroon-900 text-ivory text-xs font-semibold whitespace-nowrap shadow-sm"
          >
            Book WhatsApp Consultation
          </a>
        </div>
      </div>

      {/* Bridal Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-baseline justify-between border-b border-cream pb-3">
          <h2 className="font-serif text-2xl font-bold text-maroon-900">Bridal & Wedding Sarees</h2>
          <span className="text-xs text-darkbrown/60">{bridalProducts.length} Heirloom Sarees</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bridalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
