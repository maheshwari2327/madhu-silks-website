import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Madhu Silks | Tradition Woven Into Every Thread | Bantwal, Karnataka',
  description: 'Authentic Indian sarees: Kanchipuram bridal silk, Banarasi brocades, soft silks, handloom and festive sarees from Jakribettu, Bantwal, Karnataka.',
  keywords: 'Madhu Silks, Bantwal sarees, Kanchipuram silk sarees, Banarasi sarees, bridal sarees, soft silk, handloom sarees, Jakribettu',
  openGraph: {
    title: 'Madhu Silks - Tradition Woven Into Every Thread',
    description: 'Shop authentic bridal and traditional sarees with express delivery across India.',
    url: 'https://madhusilks.com',
    siteName: 'Madhu Silks',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col justify-between">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
