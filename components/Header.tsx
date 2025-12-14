"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper to check if link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) => 
    `flex items-center justify-center font-medium transition-colors ${
      isActive(href) 
        ? 'text-brand-pink font-bold' 
        : 'text-white/95 hover:text-brand-pink'
    }`;

  const mobileLinkClass = (href: string) =>
    `py-2 px-3 rounded-lg transition-colors ${
      isActive(href)
        ? 'text-brand-pink font-bold bg-white/5'
        : 'text-white hover:bg-white/10'
    }`;

  return (
    <header className="bg-brand-navy/95 backdrop-blur supports-[backdrop-filter]:bg-brand-navy/80 sticky top-0 z-40 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 h-[96px] relative">
        {/* Desktop/tablet: grid layout with equal width nav items */}
        <div className="hidden md:grid grid-cols-5 items-center h-full pr-24">
          <Link href="/books" className={linkClass('/books')}>{t('books')}</Link>
          <Link href="/events" className={linkClass('/events')}>{t('events')}</Link>
          <Link href="/" className="flex items-center justify-center" aria-label="Home">
            <img src="/images/logo/logo-t.gif" alt="Book Digest logo" className="h-16 w-auto" />
          </Link>
          <Link href="/about" className={linkClass('/about')}>{t('about')}</Link>
          <Link href="/joinus" className={linkClass('/joinus')}>{t('joinUs')}</Link>
        </div>

        {/* Mobile: hamburger button on left, logo centered */}
        <div className="md:hidden h-[96px] flex items-center">
          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Centered logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="inline-flex items-center" aria-label="Home">
              <img src="/images/logo/logo-t.gif" alt="Book Digest logo" className="h-10 w-auto" />
            </Link>
          </div>
          
          {/* Spacer to balance the hamburger button */}
          <div className="w-10" />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-brand-navy/98 backdrop-blur">
          <nav aria-label="Primary mobile" className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3">
            <Link 
              href="/books" 
              className={mobileLinkClass('/books')}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('books')}
            </Link>
            <Link 
              href="/events" 
              className={mobileLinkClass('/events')}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('events')}
            </Link>
            <Link 
              href="/about" 
              className={mobileLinkClass('/about')}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link 
              href="/joinus" 
              className={mobileLinkClass('/joinus')}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('joinUs')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
