'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/constants';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isInWishlist(product.id));

  const primaryImgUrl = product.primary_image?.url || product.images?.[0]?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80";
  const secondaryImgUrl = product.secondary_image?.url || product.images?.[1]?.url || primaryImgUrl;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white border border-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges & Quick Action Overlay */}
        <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] w-full overflow-hidden bg-cream/40">
          <Image
            src={primaryImgUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          {secondaryImgUrl !== primaryImgUrl && (
            <Image
              src={secondaryImgUrl}
              alt={`${product.name} detail`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {product.discount_percent > 0 && (
              <span className="bg-maroon-800 text-ivory text-[10px] font-bold px-2 py-0.5 rounded tracking-wide shadow-sm">
                {product.discount_percent}% OFF
              </span>
            )}
            {product.is_best_seller && (
              <span className="bg-gold-600 text-ivory text-[10px] font-bold px-2 py-0.5 rounded tracking-wide shadow-sm">
                BESTSELLER
              </span>
            )}
            {product.is_new_arrival && !product.is_best_seller && (
              <span className="bg-darkbrown text-ivory text-[10px] font-bold px-2 py-0.5 rounded tracking-wide shadow-sm">
                NEW
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-maroon-900 shadow-sm hover:scale-110 hover:bg-white transition-all"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-maroon-700 text-maroon-700' : 'text-darkbrown'}`} />
          </button>
        </Link>

        {/* Content details */}
        <div className="p-4 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-darkbrown/60">
            <span>{product.category_name || product.saree_type}</span>
            <span>SKU: {product.sku}</span>
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-serif font-semibold text-sm sm:text-base text-maroon-950 line-clamp-2 hover:text-gold-700 transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-darkbrown/70 line-clamp-1">
            {product.fabric} &bull; {product.colour}
          </p>
        </div>
      </div>

      {/* Pricing and Action Button */}
      <div className="p-4 pt-0 border-t border-cream/50 mt-2">
        <div className="flex items-baseline gap-2 pt-2 pb-3">
          <span className="font-semibold text-base sm:text-lg text-maroon-900">
            {formatPrice(product.final_price_in_rupees)}
          </span>
          {product.sale_price_in_rupees && product.price_in_rupees > product.final_price_in_rupees && (
            <span className="text-xs text-darkbrown/50 line-through">
              {formatPrice(product.price_in_rupees)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.is_in_stock}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
            product.is_in_stock
              ? 'bg-maroon-800 text-ivory hover:bg-maroon-900 active:scale-95 shadow-sm'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-gold-300" />
          <span>{product.is_in_stock ? 'Add to Bag' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
}

