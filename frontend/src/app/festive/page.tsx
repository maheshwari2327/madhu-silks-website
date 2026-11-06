import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Tag } from 'lucide-react';
import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';

export default async function FestivePage() {
  const allProducts = await fetchProducts();
  const festiveProducts = allProducts.filter(
    (p) => p.category_slug === 'festive' || p.occasion.toLowerCase().includes('festive') || p.category_slug === 'banarasi'
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Festive Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center bg-gradient-to-r from-maroon-900 via-gold-950 to-maroon-900 text-ivory overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-widest border border-gold-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Festive Edit</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight text-ivory">
            Diwali, Dussehra & Navratri Celebrations
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Bright jewel tones, shimmering brocade weaves, and lightweight silks crafted for joyous festivities and temple rituals.
          </p>
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400 px-4 py-2 rounded-full text-gold-200 text-xs font-bold">
            <Tag className="w-3.5 h-3.5" />
            <span>Use Coupon FESTIVE10 for 10% Off Orders Above ₹5,000</span>
          </div>
        </div>
      </section>

      {/* Festive Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-baseline justify-between border-b border-cream pb-3">
          <h2 className="font-serif text-2xl font-bold text-maroon-900">Festive Sarees</h2>
          <span className="text-xs text-darkbrown/60">{festiveProducts.length} Drapes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {festiveProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

