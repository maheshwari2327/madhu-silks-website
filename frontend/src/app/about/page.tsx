import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MapPin, Award, Heart, CheckCircle2, Phone, Mail } from 'lucide-react';
import { BRAND_INFO } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center bg-maroon-950 text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
            alt="Madhu Silks Saree Heritage"
            fill
            priority
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-wider border border-gold-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Jakribettu, Bantwal, Karnataka</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ivory">
            About Madhu Silks
          </h1>
          <p className="text-sm sm:text-base text-cream/90 font-light max-w-xl mx-auto leading-relaxed">
            &ldquo;Tradition Woven Into Every Thread&rdquo; &bull; Celebrating the timeless art of authentic Indian sarees.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Our Philosophy</span>
            <h2 className="font-serif text-3xl font-bold text-maroon-900 leading-tight">
              An Exclusive Sanctuary for Saree Enthusiasts
            </h2>
            <p className="text-sm text-darkbrown/80 leading-relaxed font-light">
              Located at <strong>Jakribettu in Bantwal, Karnataka</strong>, Madhu Silks was founded with a singular and uncompromised focus: the Indian saree. While mainstream fashion constantly shifts, the six yards of elegance represents an eternal cultural anchor.
            </p>
            <p className="text-sm text-darkbrown/80 leading-relaxed font-light">
              We choose not to dilute our focus with unrelated garments. We sell exclusively sarees—bringing together legendary Kanchipuram wedding silks, regal Banarasi brocades, breathable everyday soft silks, and artisanal handlooms.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-cream">
            <Image
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85"
              alt="Authentic Silk Weaving"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-cream/40 rounded-2xl p-8 sm:p-12 border border-cream space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Values That Guide Us</span>
            <h3 className="font-serif text-2xl font-bold text-maroon-900">Our Promises to You</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-cream space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-serif font-bold text-base text-maroon-950">Strictly Verified Specifications</h4>
              <p className="text-xs text-darkbrown/70 leading-relaxed">
                We never exaggerate fabric composition or invent certifications. We display only verified, factual saree descriptions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-cream space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-serif font-bold text-base text-maroon-950">Preserving Weaver Dignity</h4>
              <p className="text-xs text-darkbrown/70 leading-relaxed">
                We work directly with traditional weaving clusters to bring their authentic handloom skills to saree connoisseurs across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-cream space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-serif font-bold text-base text-maroon-950">Boutique Warmth Online</h4>
              <p className="text-xs text-darkbrown/70 leading-relaxed">
                Whether shopping in our Bantwal showroom or ordering online from across India, you receive dedicated personalized attention.
              </p>
            </div>
          </div>
        </div>

        {/* Visit Our Boutique in Bantwal */}
        <div className="bg-maroon-900 text-ivory rounded-2xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-lg">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Boutique Experience</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Visit Our Jakribettu Store</h3>
            <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-light">
              Experience the touch of authentic mulberry silks, intricate zari borders, and heavy bridal pallus in person. We are located in Jakribettu, Bantwal, Karnataka.
            </p>
            <div className="pt-2 text-xs space-y-1 text-cream/70">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{BRAND_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Contact: {BRAND_INFO.phoneFormatted}</span>
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold text-xs tracking-wide shadow-md transition-all text-center"
            >
              Get Directions &amp; Contact
            </Link>
            <Link
              href="/collections"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-ivory border border-white/20 font-semibold text-xs tracking-wide transition-all text-center"
            >
              Shop Sarees Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

