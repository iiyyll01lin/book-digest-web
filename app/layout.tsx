import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LangToggle from '@/components/LangToggle';
import { defaultSEO } from '@/lib/seo';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Outfit, Noto_Sans_TC } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-tc',
  display: 'swap',
});

export const metadata: Metadata = defaultSEO;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`h-full bg-brand-navy ${outfit.variable} ${notoSansTC.variable}`}>
      <head>
        {/* Favicon and PWA */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0F2E66" />
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
