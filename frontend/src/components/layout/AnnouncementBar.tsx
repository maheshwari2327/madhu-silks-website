import React from 'react';
import Link from 'next/link';
import { Phone, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '@/lib/constants';

export default function AnnouncementBar() {
  return (
    <div className="bg-maroon-900 text-ivory text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>Festive Celebrations Sale: Use code <strong className="text-gold-300 tracking-wider">FESTIVE10</strong> for 10% off</span>
          <span className="hidden md:inline text-gold-500">•</span>
          <span className="hidden md:inline text-cream/90">{BRAND_INFO.shipping}</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href={`tel:${BRAND_INFO.phone}`}
            className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-gold-400" />
            <span>{BRAND_INFO.phoneFormatted}</span>
          </a>
          <span className="text-maroon-600">|</span>
          <Link href="/contact" className="hover:text-gold-300 transition-colors">
            Jakribettu, Bantwal
          </Link>
        </div>
      </div>
    </div>
  );
}
