'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { FALLBACK_PRODUCTS } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { SAREE_CATEGORIES } from '@/lib/constants';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(searchCategory || 'all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(35000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Dynamic filter lists
  const fabrics = ['Pure Mulberry Silk', 'Pure Katan Silk', 'Lightweight Soft Silk', 'Handloom Silk Cotton Blend', 'Pure Organza Silk', 'Art Silk Brocade'];
  const occasions = ['Bridal', 'Festive', 'Traditional', 'Party', 'Wedding'];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return FALLBACK_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category_slug !== selectedCategory) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'all' && !product.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }
      // Occasion filter
      if (selectedOccasion !== 'all' && !product.occasion.toLowerCase().includes(selectedOccasion.toLowerCase())) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && !product.is_in_stock) {
        return false;
      }
      // Price filter
      if (product.final_price_in_rupees > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery) {
        const matchesName = product.name.toLowerCase().includes(searchQuery);
        const matchesSku = product.sku.toLowerCase().includes(searchQuery);
        const matchesFabric = product.fabric.toLowerCase().includes(searchQuery);
        if (!matchesName && !matchesSku && !matchesFabric) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.final_price_in_rupees - b.final_price_in_rupees;
      if (sortBy === 'price_desc') return b.final_price_in_rupees - a.final_price_in_rupees;
      if (sortBy === 'bestseller') return (b.is_best_seller ? 1 : 0) - (a.is_best_seller ? 1 : 0);
      return b.id - a.id; // newest
    });
  }, [selectedCategory, selectedFabric, selectedOccasion, inStockOnly, maxPrice, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Breadcrumb */}
      <div>
        <div className="text-xs text-darkbrown/60 mb-2">
          <Link href="/" className="hover:text-maroon-800">Home</Link> &gt; <span>Saree Collections</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
          All Saree Collections
        </h1>
        <p className="text-xs sm:text-sm text-darkbrown/70 mt-1 max-w-2xl">
          Discover our curated spectrum of traditional Indian sarees, strictly authentic and handpicked for Madhu Silks in Jakribettu, Bantwal.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-maroon-800 text-ivory'
              : 'bg-white border border-cream text-darkbrown/80 hover:bg-cream'
          }`}
        >
          All Sarees
        </button>
        {SAREE_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-maroon-800 text-ivory'
                : 'bg-white border border-cream text-darkbrown/80 hover:bg-cream'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block bg-white p-6 rounded-xl border border-cream space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-cream">
            <h3 className="font-serif font-bold text-base text-maroon-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-gold-600" />
              <span>Filters</span>
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFabric('all');
                setSelectedOccasion('all');
                setInStockOnly(false);
                setMaxPrice(35000);
              }}
              className="text-[11px] text-maroon-800 hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-darkbrown flex justify-between">
              <span>Max Price</span>
              <span className="text-maroon-800 font-semibold">₹{maxPrice.toLocaleString('en-IN')}</span>
            </label>
            <input
              type="range"
              min="5000"
              max="35000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-maroon-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-darkbrown/50">
              <span>₹5,000</span>
              <span>₹35,000</span>
            </div>
          </div>

          {/* Fabric */}
          <div className="space-y-2 pt-2 border-t border-cream">
            <label className="text-xs font-bold text-darkbrown">Fabric</label>
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="w-full bg-cream/40 border border-cream text-xs rounded-lg p-2 focus:outline-none"
            >
              <option value="all">All Fabrics</option>
              {fabrics.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Occasion */}
          <div className="space-y-2 pt-2 border-t border-cream">
            <label className="text-xs font-bold text-darkbrown">Occasion</label>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="w-full bg-cream/40 border border-cream text-xs rounded-lg p-2 focus:outline-none"
            >
              <option value="all">All Occasions</option>
              {occasions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* In Stock toggle */}
          <div className="pt-2 border-t border-cream">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-maroon-800 focus:ring-maroon-800 w-4 h-4"
              />
              <span className="text-xs font-medium text-darkbrown">In Stock Sarees Only</span>
            </label>
          </div>
        </aside>

        {/* Products Listing Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar (Count, Mobile Filter Trigger, Sorting) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-cream gap-4">
            <div className="text-xs text-darkbrown/70 font-medium">
              Showing <strong>{filteredProducts.length}</strong> authentic saree drapes
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-cream rounded-lg text-xs font-semibold text-darkbrown"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-gold-600" />
                <span>Filters</span>
              </button>

              {/* Sorting */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-darkbrown/60">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-cream rounded-lg py-1.5 px-2.5 text-xs text-darkbrown focus:outline-none focus:ring-1 focus:ring-gold-500 font-medium"
                >
                  <option value="newest">Newest Additions</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="bestseller">Best Selling</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-cream p-8 space-y-3">
              <p className="font-serif text-lg text-maroon-900">No sarees match your selected criteria.</p>
              <p className="text-xs text-darkbrown/60">Try adjusting your filters or price range.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedFabric('all');
                  setSelectedOccasion('all');
                  setInStockOnly(false);
                  setMaxPrice(35000);
                }}
                className="mt-2 px-4 py-2 rounded-lg bg-maroon-800 text-ivory text-xs font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-4/5 max-w-sm bg-white h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-cream">
                <h3 className="font-serif font-bold text-lg text-maroon-900">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-darkbrown" />
                </button>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-darkbrown flex justify-between">
                  <span>Max Price: ₹{maxPrice.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="35000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-maroon-800"
                />
              </div>

              {/* Fabric */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-darkbrown">Fabric</label>
                <select
                  value={selectedFabric}
                  onChange={(e) => setSelectedFabric(e.target.value)}
                  className="w-full bg-cream/40 border border-cream text-xs rounded-lg p-2"
                >
                  <option value="all">All Fabrics</option>
                  {fabrics.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Occasion */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-darkbrown">Occasion</label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full bg-cream/40 border border-cream text-xs rounded-lg p-2"
                >
                  <option value="all">All Occasions</option>
                  {occasions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* In stock */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-maroon-800"
                  />
                  <span className="text-xs font-medium text-darkbrown">In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-cream">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 bg-maroon-800 text-ivory rounded-lg text-xs font-bold"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="font-serif text-lg text-maroon-900">Loading Saree Collections...</p>
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}
