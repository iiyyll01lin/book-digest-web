"use client";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LangToggle from './LangToggle';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <header className="bg-brand-navy/95 backdrop-blur supports-[backdrop-filter]:bg-brand-navy/80 sticky top-0 z-40 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 h-18 relative">
        {/* Desktop/tablet: 5-column grid so each item shares space with the centered logo */}
        <div className="hidden md:grid grid-cols-5 items-center h-full text-white/95">
          <div className="flex items-center justify-center">
            <Link href="/books" className="hover:underline font-medium">{t('books')}</Link>
          </div>
          <div className="flex items-center justify-center">
            <Link href="/events" className="hover:underline font-medium">{t('events')}</Link>
          </div>
          <div className="flex items-center justify-center">
            <Link href="/" className="inline-flex items-center" aria-label="Home">
              <img src="/logo.svg" alt="Book Digest logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Link href="/events#signup" className="hover:underline font-medium">{t('joinUs')}</Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-end w-full max-w-[12rem] gap-4">
              <Link href="/about" className="hover:underline font-medium">{t('about')}</Link>
              <LangToggle />
            </div>
          </div>
        </div>


        {/* Mobile: centered logo only on the top bar */}
        <div className="md:hidden h-16 flex items-center justify-center">
          <Link href="/" className="inline-flex items-center" aria-label="Home">
            <img src="/logo.svg" alt="Book Digest logo" className="h-7 w-auto" />
          </Link>
        </div>
      </div>

      {/* Mobile nav (below header) */}
      <div className="md:hidden border-t border-white/10">
        <nav aria-label="Primary mobile" className="mx-auto max-w-6xl px-6 h-12 flex items-center justify-between text-sm tracking-wide">
          <div className="flex items-center gap-4">
            <Link href="/books" className="hover:underline">{t('books')}</Link>
            <Link href="/events" className="hover:underline">{t('events')}</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/events#signup" className="hover:underline">{t('join')}</Link>
            <Link href="/about" className="hover:underline">{t('about')}</Link>
            <LangToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
