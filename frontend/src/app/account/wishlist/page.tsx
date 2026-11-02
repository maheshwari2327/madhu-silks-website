'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import ProductCard from '@/components/product/ProductCard';

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-cream">
        <div>
          <h1 className="font-serif text-3xl font-bold text-maroon-900">Saved Sarees</h1>
          <p className="text-xs text-darkbrown/60 mt-1">
            You have {items.length} {items.length === 1 ? 'saree' : 'sarees'} saved in your wishlist.
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-semibold text-red-700 hover:underline"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-cream p-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-cream mx-auto flex items-center justify-center text-maroon-800">
            <Heart className="w-8 h-8 text-gold-600" />
          </div>
          <h2 className="font-serif font-bold text-xl text-maroon-900">Your wishlist is empty</h2>
          <p className="text-xs text-darkbrown/70 max-w-sm mx-auto">
            Click the heart icon on any saree to save it for later review or wedding gifting.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon-800 hover:bg-maroon-900 text-ivory text-xs font-bold transition-colors"
          >
            <span>Explore Saree Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
