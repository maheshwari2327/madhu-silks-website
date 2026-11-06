'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Zap,
  MessageCircle,
  Truck,
  ShieldCheck,
  Check,
  ChevronRight,
  Info,
  Sparkles,
  Share2
} from 'lucide-react';
import { FALLBACK_PRODUCTS } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { formatPrice, generateWhatsAppLink, BRAND_INFO } from '@/lib/constants';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const product = FALLBACK_PRODUCTS.find((p) => p.slug === params.slug) || FALLBACK_PRODUCTS[0];

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isInWishlist(product.id));

  // Images setup
  const images = product.images && product.images.length > 0
    ? product.images
    : [
        { id: 1, url: product.primary_image?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85", alt_text: product.name, view_type: 'FRONT' as const, is_primary: true, display_order: 0 }
      ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ serviceable: boolean; message: string } | null>(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAddedBanner, setShowAddedBanner] = useState(false);

  // Related products
  const relatedProducts = FALLBACK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category_slug === product.category_slug || p.fabric === product.fabric)
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowAddedBanner(true);
    setTimeout(() => setShowAddedBanner(false), 3000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push('/checkout');
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeStatus({ serviceable: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }
    setIsCheckingPincode(true);
    setTimeout(() => {
      setIsCheckingPincode(false);
      const firstDigit = pincode.trim()[0];
      const deliveryDays = firstDigit === '5' ? '2 - 3 business days' : firstDigit === '6' ? '3 - 4 business days' : '4 - 5 business days';
      setPincodeStatus({
        serviceable: true,
        message: `Delivery available to ${pincode.trim()} via Express Courier. Expected in ${deliveryDays}. Free shipping applicable.`
      });
    }, 400);
  };

  const whatsappEnquiryUrl = generateWhatsAppLink(product.name, product.sku, product.final_price_in_rupees);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-darkbrown/60 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-maroon-800">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/collections" className="hover:text-maroon-800">Collections</Link>
        {product.category_slug && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/collections/${product.category_slug}`} className="hover:text-maroon-800">
              {product.category_name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-maroon-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-start">
        {/* Left: Gallery (Main Image & Thumbnails) */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-cream/40 border border-cream shadow-md">
            <Image
              src={images[activeImageIndex]?.url || images[0].url}
              alt={images[activeImageIndex]?.alt_text || product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-all duration-300"
            />
            {product.discount_percent > 0 && (
              <span className="absolute top-4 left-4 bg-maroon-800 text-ivory text-xs font-bold px-3 py-1 rounded-md shadow-md tracking-wider">
                {product.discount_percent}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-maroon-900 hover:scale-110 transition-transform"
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-maroon-700 text-maroon-700' : 'text-darkbrown'}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-maroon-800 ring-2 ring-gold-400' : 'border-cream opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt_text || `View ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-maroon-950/80 text-ivory text-[9px] text-center py-0.5 truncate uppercase">
                    {img.view_type || `View ${idx + 1}`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details, Verified Specs & Buying Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-darkbrown/60 mb-1">
              <span className="uppercase tracking-widest font-semibold text-gold-700">
                {product.category_name || product.saree_type}
              </span>
              <span className="font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-4 bg-cream/40 rounded-xl border border-cream">
            <span className="font-serif text-3xl font-bold text-maroon-900">
              {formatPrice(product.final_price_in_rupees)}
            </span>
            {product.sale_price_in_rupees && product.price_in_rupees > product.final_price_in_rupees && (
              <span className="text-sm text-darkbrown/50 line-through">
                {formatPrice(product.price_in_rupees)}
              </span>
            )}
            <span className="text-xs text-darkbrown/60 ml-auto font-medium">
              Inclusive of all taxes &bull; Free express delivery
            </span>
          </div>

          {/* Stock Alert */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            {product.stock_quantity > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock ({product.stock_quantity} available at Jakribettu boutique)</span>
              </span>
            ) : (
              <span className="text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                Currently Out of Stock
              </span>
            )}
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-4">
            <label className="text-xs font-bold text-darkbrown">Quantity:</label>
            <div className="flex items-center border border-cream rounded-lg bg-white overflow-hidden shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-sm hover:bg-cream/60 transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                className="px-3 py-1.5 text-sm hover:bg-cream/60 transition-colors"
                disabled={quantity >= product.stock_quantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.is_in_stock}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-maroon-800 hover:bg-maroon-900 active:scale-98 text-ivory font-bold text-sm shadow-md transition-all disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4 text-gold-300" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.is_in_stock}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 active:scale-98 text-maroon-950 font-bold text-sm shadow-md transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now with Express Checkout</span>
              </button>
            </div>

            {/* WhatsApp Enquiry Button */}
            <a
              href={whatsappEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] font-bold text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order / Enquire on WhatsApp (8749090701)</span>
            </a>
          </div>

          {/* Added to Bag notification toast */}
          {showAddedBanner && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex items-center justify-between animate-fade-in">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Added {quantity}x &ldquo;{product.name}&rdquo; to your shopping bag!</span>
              </span>
              <Link href="/cart" className="font-bold underline text-emerald-800">
                View Bag &rarr;
              </Link>
            </div>
          )}

          {/* Pincode Serviceability Check */}
          <div className="p-4 bg-white rounded-xl border border-cream space-y-2">
            <label className="text-xs font-bold text-darkbrown flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold-600" />
              <span>Check Delivery Pincode:</span>
            </label>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit Indian PIN Code"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-grow px-3 py-2 border border-cream rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
              <button
                type="submit"
                disabled={isCheckingPincode}
                className="px-4 py-2 bg-maroon-800 text-ivory rounded-lg text-xs font-semibold hover:bg-maroon-900 transition-colors whitespace-nowrap"
              >
                {isCheckingPincode ? 'Checking...' : 'Check'}
              </button>
            </form>
            {pincodeStatus && (
              <p className={`text-xs mt-1 ${pincodeStatus.serviceable ? 'text-emerald-700' : 'text-red-700'}`}>
                {pincodeStatus.message}
              </p>
            )}
          </div>

          {/* Verified Saree Specifications Table */}
          <div className="border border-cream rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="px-4 py-3 bg-cream/50 border-b border-cream font-serif font-bold text-sm text-maroon-900">
              Verified Saree Specifications
            </div>
            <div className="divide-y divide-cream/60 text-xs">
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-darkbrown/60">Colour</span>
                <span className="col-span-2 text-darkbrown font-medium">{product.colour}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-darkbrown/60">Fabric</span>
                <span className="col-span-2 text-darkbrown font-medium">{product.fabric}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-darkbrown/60">Saree Type</span>
                <span className="col-span-2 text-darkbrown font-medium">{product.saree_type}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-darkbrown/60">Weaving Details</span>
                <span className="col-span-2 text-darkbrown font-medium">{product.weaving_details || "Authentic Traditional Handloom Jacquard"}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-darkbrown/60">Occasion</span>
                <span className="col-span-2 text-darkbrown font-medium">{product.occasion}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-darkbrown/60">Saree Length</span>
                <span className="col-span-2 text-darkbrown font-medium">{product.saree_length || "5.5 Meters Standard"}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-darkbrown/60">Blouse Piece</span>
                <span className="col-span-2 text-darkbrown font-medium">{product.blouse_piece_details || "Included - 0.8 Meters Running Piece"}</span>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-base text-maroon-900">About This Drape</h3>
            <p className="text-xs sm:text-sm text-darkbrown/80 leading-relaxed font-light">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-cream">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl font-bold text-maroon-900">You May Also Admire</h2>
            <Link href="/collections" className="text-xs font-semibold text-maroon-800 hover:text-gold-600">
              View All Sarees &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

