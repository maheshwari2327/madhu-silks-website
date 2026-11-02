'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useAuthStore } from '@/store/useAuthStore';
import { BRAND_INFO, SAREE_CATEGORIES } from '@/lib/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items);
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  // Listen to scroll to add sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Kanchipuram', href: '/collections/kanchipuram-silk' },
    { name: 'Banarasi', href: '/collections/banarasi' },
    { name: 'Soft Silk', href: '/collections/soft-silk' },
    { name: 'Bridal', href: '/bridal' },
    { name: 'Festive', href: '/festive' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-40 bg-ivory transition-shadow duration-300 ${isScrolled ? 'shadow-md border-b border-cream' : 'border-b border-cream/70'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-maroon-800 hover:text-gold-600 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 ml-1 text-maroon-800 hover:text-gold-600 focus:outline-none"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo & Peacock Concept Symbol */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-3 group">
              {/* Stylized Peacock Feathers / Motif SVG Icon */}
              <div className="w-10 h-10 rounded-full bg-maroon-800 border-2 border-gold-400 flex items-center justify-center text-gold-300 shadow-sm group-hover:bg-maroon-900 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4" />
                  <path d="M12 2c5.5 0 10 4.5 10 10 0 3.5-1.8 6.6-4.6 8.4" />
                  <path d="M12 2v20" />
                  <circle cx="12" cy="7" r="2" fill="#B08A4A" />
                  <path d="M8 12c1.5 2 2.5 4 4 4s2.5-2 4-4" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-2xl font-bold tracking-tight text-maroon-900 leading-none">
                  Madhu Silks
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold-700 font-medium mt-1">
                  Jakribettu, Bantwal
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search sarees, zari, weaves..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream/70 border border-gold-200/80 rounded-full py-1.5 pl-4 pr-10 text-xs sm:text-sm text-darkbrown placeholder:text-darkbrown/50 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-700 hover:text-maroon-800"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Action Icons (Account, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded bg-maroon-100 text-maroon-800 hover:bg-maroon-200 transition-colors"
              >
                Admin Panel
              </Link>
            )}

            <Link
              href={user ? "/account/profile" : "/account/login"}
              className="p-2 text-maroon-900 hover:text-gold-600 transition-colors"
              title={user ? `Signed in as ${user.first_name || user.email}` : "Customer Account"}
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/account/wishlist"
              className="p-2 text-maroon-900 hover:text-gold-600 transition-colors relative"
              title="Saved Sarees (Wishlist)"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold-600 text-ivory text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 bg-maroon-800 text-ivory px-3.5 py-2 rounded-full hover:bg-maroon-900 transition-colors shadow-sm"
              title="View Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-gold-300" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold-500 text-maroon-950 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium hidden sm:inline">Bag</span>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center border-t border-cream/80 py-3 gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive
                    ? 'text-maroon-800 font-semibold'
                    : 'text-darkbrown/80 hover:text-maroon-800'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-ivory shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cream">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-maroon-800 border border-gold-400 flex items-center justify-center text-gold-300">
                    <span className="font-serif font-bold text-xs">MS</span>
                  </div>
                  <span className="font-serif font-bold text-lg text-maroon-900">Madhu Silks</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-darkbrown/70 hover:text-maroon-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search sarees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-cream border border-gold-200 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-700">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Navigation Links */}
              <div className="mt-6 flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-medium text-maroon-900 py-2 border-b border-cream/50 hover:text-gold-600"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-gold-500" />
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-semibold text-maroon-700 py-2"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-6 border-t border-cream text-xs text-darkbrown/70 space-y-1">
              <p className="font-semibold text-maroon-900">{BRAND_INFO.address}</p>
              <p>WhatsApp: {BRAND_INFO.whatsappFormatted}</p>
              <p>Phone: {BRAND_INFO.phoneFormatted}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
