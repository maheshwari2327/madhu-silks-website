import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, Star, Shield, Award, Truck, CheckCircle2 } from 'lucide-react';
import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { SAREE_CATEGORIES, BRAND_INFO } from '@/lib/constants';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const allProducts = await fetchProducts();
  const featuredProducts = allProducts.filter((p) => p.is_featured).slice(0, 4);
  const bestSellers = allProducts.filter((p) => p.is_best_seller).slice(0, 4);
  const newArrivals = allProducts.filter((p) => p.is_new_arrival).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Banner Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-maroon-950 text-ivory overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
            alt="Madhu Silks Handwoven Indian Saree"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-luminosity scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-950 via-maroon-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jakribettu, Bantwal &bull; Handcrafted Heritage</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-ivory">
              Tradition Woven Into Every Thread
            </h1>

            <p className="text-base sm:text-lg text-cream/90 leading-relaxed font-light">
              Discover beautiful sarees that celebrate timeless Indian tradition. Sourced with devotion for weddings, ceremonies, and cherished festive moments.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/collections"
                className="px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-gold-500/20 active:scale-95 flex items-center gap-2"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bridal"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-ivory border border-white/20 font-semibold text-sm tracking-wide transition-all backdrop-blur-sm active:scale-95"
              >
                Shop Bridal Sarees
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Saree Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Curated Drapes</span>
          <h2 className="font-serif text-3xl font-bold text-maroon-900">Explore Saree Collections</h2>
          <p className="text-sm text-darkbrown/70">Every piece woven with authentic technique and pure craftsmanship.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {SAREE_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group relative rounded-xl overflow-hidden border border-cream bg-white shadow-sm hover:shadow-md transition-all p-4 text-center flex flex-col items-center justify-between hover:border-gold-300"
            >
              <div className="w-14 h-14 rounded-full bg-maroon-50 border border-gold-300/40 flex items-center justify-center text-maroon-800 group-hover:bg-maroon-800 group-hover:text-gold-300 transition-colors mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-maroon-950 group-hover:text-gold-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-darkbrown/60 line-clamp-2 mt-1">{cat.desc}</p>
              </div>
              <span className="text-xs font-semibold text-gold-700 inline-flex items-center gap-1 mt-3 group-hover:translate-x-1 transition-transform">
                Browse &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Sarees Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Handpicked For You</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900">Featured Sarees</h2>
          </div>
          <Link href="/collections" className="text-sm font-semibold text-maroon-800 hover:text-gold-600 inline-flex items-center gap-1.5">
            <span>View All Sarees</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Bridal Collection Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-maroon-900 text-ivory shadow-xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85"
              alt="Madhu Silks Bridal Collection"
              fill
              className="object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-maroon-950 via-maroon-900/90 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">The Wedding Edit</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory leading-tight">
              Grand Bridal Trousseau Collection
            </h2>
            <p className="text-sm sm:text-base text-cream/80 leading-relaxed font-light">
              Immerse yourself in authentic crimson, vermilion and antique gold Kanchipuram and Banarasi drapes, meticulously woven for auspicious wedding rituals.
            </p>
            <div className="pt-2">
              <Link
                href="/bridal"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold text-sm tracking-wide transition-all shadow-md active:scale-95"
              >
                <span>Explore Bridal Sarees</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Customer Favourites</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900">Best-Selling Sarees</h2>
          </div>
          <Link href="/collections" className="text-sm font-semibold text-maroon-800 hover:text-gold-600 inline-flex items-center gap-1.5">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Festive Collection Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-gold-900 to-maroon-900 text-ivory shadow-lg p-8 sm:p-12">
          <div className="max-w-xl space-y-3">
            <span className="bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-400/30 inline-block">
              Diwali &bull; Dussehra &bull; Navratri
            </span>
            <h2 className="font-serif text-3xl font-bold text-ivory">Festive Celebrations Saree Edit</h2>
            <p className="text-sm text-cream/80">
              Celebrate with radiant hues and lightweight drapes designed for joyful family gatherings. Enjoy instant 10% off with coupon code <strong className="text-gold-300">FESTIVE10</strong>.
            </p>
            <div className="pt-2">
              <Link
                href="/festive"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ivory text-maroon-950 font-bold text-sm hover:bg-gold-100 transition-colors shadow-sm"
              >
                <span>Shop Festive Sarees</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Madhu Silks */}
      <section className="bg-cream/40 py-16 border-y border-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Why Madhu Silks</span>
            <h2 className="font-serif text-3xl font-bold text-maroon-900">Craftsmanship & Integrity</h2>
            <p className="text-sm text-darkbrown/70">
              Rooted in Jakribettu, Bantwal, we are dedicated solely to providing genuine sarees that bring timeless elegance to your wardrobe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-cream shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-maroon-50 text-maroon-800 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-maroon-900">Exclusively Sarees</h3>
              <p className="text-xs text-darkbrown/70 leading-relaxed">
                We specialize strictly in sarees. No distractions, no diluted focus. Every fabric, zari density, and pallu is selected by passionate experts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-cream shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-maroon-50 text-maroon-800 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-maroon-900">Pan-India Express Shipping</h3>
              <p className="text-xs text-darkbrown/70 leading-relaxed">
                Free shipping across India on orders above ₹3,000. Reliable courier partners with live tracking and doorstep delivery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-cream shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-maroon-50 text-maroon-800 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-maroon-900">Personalized WhatsApp Service</h3>
              <p className="text-xs text-darkbrown/70 leading-relaxed">
                Need a video call look of the drape before ordering? Connect directly on WhatsApp with our Bantwal boutique team at 8749090701.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Testimonials (Demonstration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Patron Experiences</span>
          <h2 className="font-serif text-3xl font-bold text-maroon-900">Loved by Saree Connoisseurs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-cream shadow-sm space-y-3">
            <div className="flex text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-500" />
              ))}
            </div>
            <p className="text-xs text-darkbrown/80 italic leading-relaxed">
              &ldquo;The Kanchipuram bridal saree I ordered for my sister&apos;s wedding was breathtaking. The Korvai border and heavy zari pallu were exactly as pictured. Delivered to Bangalore in 2 days!&rdquo;
            </p>
            <div className="pt-2 text-xs font-bold text-maroon-900">
              — Ananya Hegde, Bengaluru
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-cream shadow-sm space-y-3">
            <div className="flex text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-500" />
              ))}
            </div>
            <p className="text-xs text-darkbrown/80 italic leading-relaxed">
              &ldquo;Madhu Silks in Jakribettu is our family&apos;s trusted saree destination. Being able to order online and clarify queries over WhatsApp is wonderfully convenient.&rdquo;
            </p>
            <div className="pt-2 text-xs font-bold text-maroon-900">
              — Rajeshwari Bhat, Mangalore
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-cream shadow-sm space-y-3">
            <div className="flex text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-500" />
              ))}
            </div>
            <p className="text-xs text-darkbrown/80 italic leading-relaxed">
              &ldquo;Lightweight soft silk saree with gorgeous silver zari work. Perfect for temple occasions and long hours of wear without feeling heavy.&rdquo;
            </p>
            <div className="pt-2 text-xs font-bold text-maroon-900">
              — Deepa K., Mysuru
            </div>
          </div>
        </div>
      </section>

      {/* 9. Instagram Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Follow Our Journey</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900">@madhusilksbantwal</h2>
          <p className="text-xs text-darkbrown/60">Tag us on Instagram to be featured in our heritage gallery.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-cream">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
              alt="Madhu Silks Saree Draping"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-cream">
            <Image
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80"
              alt="Madhu Silks Zari Detail"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-cream">
            <Image
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80"
              alt="Madhu Silks Festive Collection"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-cream">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
              alt="Madhu Silks Pallu Weaving"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div>
          <a
            href={BRAND_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-maroon-800 hover:text-gold-600 uppercase tracking-wider"
          >
            <span>Visit Instagram Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 10. Newsletter Subscription */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-maroon-900 text-ivory rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-lg border border-gold-800/40">
          <h3 className="font-serif text-2xl font-bold">Join the Madhu Silks Family</h3>
          <p className="text-xs sm:text-sm text-cream/80 max-w-md mx-auto">
            Subscribe to receive private preview access to new bridal arrivals, festive releases, and heritage saree stories.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-grow px-4 py-2.5 rounded-lg sm:rounded-r-none text-xs sm:text-sm text-darkbrown focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg sm:rounded-l-none bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[11px] text-cream/50">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
