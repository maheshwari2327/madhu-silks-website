export const BRAND_INFO = {
  name: "Madhu Silks",
  tagline: "Tradition Woven Into Every Thread",
  description: "Exquisite handwoven traditional Indian silk sarees from the weaving traditions of Jakribettu, Bantwal, Karnataka.",
  address: "Madhu Silks, Jakribettu, Bantwal, Karnataka, India",
  phone: "7338015172",
  phoneFormatted: "+91 73380 15172",
  whatsapp: "8749090701",
  whatsappFormatted: "+91 87490 90701",
  email: "madhusilks701@gmail.com",
  instagram: "https://www.instagram.com/madhusilksbantwal/",
  instagramHandle: "@madhusilksbantwal",
  shipping: "Free express shipping across India on orders above ₹3,000",
};

export const SAREE_CATEGORIES = [
  { name: "Kanchipuram Silk Sarees", slug: "kanchipuram-silk", desc: "Pure temple border silks woven with authentic golden zari" },
  { name: "Banarasi Sarees", slug: "banarasi", desc: "Opulent Mughal-inspired brocades with rich kadwa and meenakari motifs" },
  { name: "Soft Silk Sarees", slug: "soft-silk", desc: "Feather-light drape crafted for all-day comfort and modern grace" },
  { name: "Bridal Sarees", slug: "bridal", desc: "Grand heirloom wedding drapes for auspicious muhurtham rituals" },
  { name: "Traditional Sarees", slug: "traditional", desc: "Time-honoured heritage sarees passed down through generations" },
  { name: "Festive Sarees", slug: "festive", desc: "Radiant drapes for Diwali, Dussehra, Navratri and family functions" },
  { name: "Handloom Sarees", slug: "handloom", desc: "Artisanal pitloom treasures woven by master South Indian artisans" },
  { name: "Designer Sarees", slug: "designer", desc: "Contemporary silhouettes blending classic zari with fresh aesthetics" },
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export function formatPrice(amountInRupees: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amountInRupees);
}

export function generateWhatsAppLink(productName: string, sku: string, priceInRupees: number, currentUrl?: string): string {
  const url = currentUrl || (typeof window !== 'undefined' ? window.location.href : 'https://madhusilks.com');
  const message = `Hello Madhu Silks! I am interested in this saree.\n\nProduct: ${productName}\nSKU: ${sku}\nPrice: ${formatPrice(priceInRupees)}\nProduct Link: ${url}\n\nPlease share more details and availability.`;
  return `https://wa.me/918749090701?text=${encodeURIComponent(message)}`;
}
