import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { defaultSEO } from '@/lib/seo';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';

export const metadata: Metadata = defaultSEO;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full bg-brand-navy">
      <head>
        {/* Outfit font for CTAs and headings */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
