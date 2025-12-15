import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LangToggle from '@/components/LangToggle';
import { defaultSEO, defaultViewport } from '@/lib/seo';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Outfit, Noto_Sans_TC } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

// Noto Sans TC with optimized CJK subset loading
// Only load Traditional Chinese characters commonly used in the UI
const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-tc',
  display: 'swap',
  // Preload only the most common characters for faster initial load
  preload: true,
  // Use font-display: swap for better perceived performance
  adjustFontFallback: true,
});

export const metadata: Metadata = defaultSEO;
export const viewport: Viewport = defaultViewport;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`h-full bg-brand-navy ${outfit.variable} ${notoSansTC.variable}`}>
      <head>
        {/* Preconnect to critical resources (performance optimization) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Favicon and PWA */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* theme-color is now handled by viewport export */}
        {/* Alternate languages */}
        <link rel="alternate" hrefLang="en" href="https://bookdigest.club" />
        <link rel="alternate" hrefLang="zh-TW" href="https://bookdigest.club?lang=zh" />
        <link rel="alternate" hrefLang="x-default" href="https://bookdigest.club" />
      </head>
      <body className="min-h-screen flex flex-col text-white font-body">
        <NextIntlClientProvider messages={messages}>
          <LangToggle />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
