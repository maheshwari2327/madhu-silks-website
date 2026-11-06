import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { SAREE_CATEGORIES } from '@/lib/constants';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return SAREE_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const currentCategory = SAREE_CATEGORIES.find((cat) => cat.slug === params.category);

  if (!currentCategory) {
    notFound();
  }

  const allProducts = await fetchProducts({ category: params.category });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <div className="text-xs text-darkbrown/60">
        <Link href="/" className="hover:text-maroon-800">Home</Link> &gt;{' '}
        <Link href="/collections" className="hover:text-maroon-800">Collections</Link> &gt;{' '}
        <span className="text-maroon-900 font-medium">{currentCategory.name}</span>
      </div>

      {/* Category Hero / Header */}
      <div className="bg-cream/50 rounded-2xl p-8 border border-cream space-y-3 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Authentic Saree Collection</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
          {currentCategory.name}
        </h1>
        <p className="text-xs sm:text-sm text-darkbrown/70 max-w-2xl leading-relaxed">
          {currentCategory.desc}. Every piece at Madhu Silks is carefully inspected for quality weave, authentic zari density, and flawless finishing.
        </p>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="text-xs text-darkbrown/60">
          Showing <strong>{allProducts.length}</strong> sarees in {currentCategory.name}
        </div>

        {allProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-cream p-8 space-y-3">
            <p className="font-serif text-lg text-maroon-900">New weaves arriving soon in this collection.</p>
            <p className="text-xs text-darkbrown/60">Check our other authentic saree categories.</p>
            <Link
              href="/collections"
              className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-maroon-800 text-ivory text-xs font-semibold"
            >
              Explore All Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

