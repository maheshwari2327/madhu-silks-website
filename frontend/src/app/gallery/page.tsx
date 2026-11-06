import React from 'react';
import Image from 'next/image';
import Link from 'next/image';
import { Camera, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const galleryItems = [
    {
      title: "Bridal Crimson Kanchipuram Weaving",
      category: "Bridal Collection",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      span: "col-span-1 md:col-span-2 md:row-span-2"
    },
    {
      title: "Pure Banarasi Gold Kadwa Motifs",
      category: "Banarasi Weaves",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85",
      span: "col-span-1"
    },
    {
      title: "Soft Mulberry Silk Pastel Drapery",
      category: "Soft Silk",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85",
      span: "col-span-1"
    },
    {
      title: "Artisanal Pitloom Handloom Setup",
      category: "Handloom Heritage",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
      span: "col-span-1"
    },
    {
      title: "Jakribettu Boutique Display & Festive Setup",
      category: "Boutique Showcase",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85",
      span: "col-span-1"
    },
    {
      title: "Intricate Temple Border Pallu Close-up",
      category: "Zari Craftsmanship",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85",
      span: "col-span-1 md:col-span-2"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Visual Splendour</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
          Madhu Silks Gallery
        </h1>
        <p className="text-xs sm:text-sm text-darkbrown/70 leading-relaxed">
          Glimpses of authentic handwoven sarees, rich zari motifs, festive drapes and our Jakribettu, Bantwal boutique collection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            className={`group relative rounded-2xl overflow-hidden bg-cream shadow-md min-h-[300px] ${item.span}`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-ivory">
              <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">{item.category}</span>
              <h3 className="font-serif font-bold text-lg text-ivory">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

