'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '@/lib/constants';

export default function FloatingWhatsApp() {
  const defaultMessage = `Hello Madhu Silks! I am visiting your website and would like assistance with saree collections.`;
  const whatsappUrl = `https://wa.me/91${BRAND_INFO.whatsapp}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside aria-label="Customer Support">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:bg-[#20ba5a] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 group"
        aria-label="Chat with Madhu Silks on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold px-0 group-hover:px-1">
          Chat with Us
        </span>
      </a>
    </aside>
  );
}
