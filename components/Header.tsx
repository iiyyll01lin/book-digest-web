"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  // Simple language toggle (UI only); persists to localStorage
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
    if (saved === 'en' || saved === 'zh') setLang(saved);
  }, []);
  const switchLang = (next: 'en' | 'zh') => {
    setLang(next);
    if (typeof window !== 'undefined') window.localStorage.setItem('lang', next);
  };

  return (
    <header className="bg-brand-navy/95 backdrop-blur supports-[backdrop-filter]:bg-brand-navy/80 sticky top-0 z-40 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 h-18 relative">
        {/* Desktop/tablet: 5-column grid so each item shares space with the centered logo */}
  <div className="hidden md:grid grid-cols-5 items-center h-full text-white/95">
          <div className="flex items-center justify-center">
            <Link href="/books" className="hover:underline font-medium">Books</Link>
          </div>
          <div className="flex items-center justify-center">
            <Link href="/events" className="hover:underline font-medium">Events</Link>
          </div>
          <div className="flex items-center justify-center">
            <Link href="/" className="inline-flex items-center" aria-label="Home">
              <img src="/logo.svg" alt="Book Digest logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Link href="/events#signup" className="hover:underline font-medium">Join Us</Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-end w-full max-w-[12rem] gap-4">
              <Link href="/about" className="hover:underline font-medium">About</Link>
              <div className="inline-flex rounded-full border border-white/25 bg-white/5 p-1">
                <button
                  aria-label="Switch to English"
                  onClick={() => switchLang('en')}
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${lang==='en' ? 'bg-brand-pink text-brand-navy' : 'text-white'}`}
                >EN</button>
                <button
                  aria-label="Switch to Chinese"
                  onClick={() => switchLang('zh')}
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${lang==='zh' ? 'bg-brand-pink text-brand-navy' : 'text-white'}`}
                >繁</button>
              </div>
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
            <Link href="/books" className="hover:underline">Books</Link>
            <Link href="/events" className="hover:underline">Events</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/events#signup" className="hover:underline">Join</Link>
            <Link href="/about" className="hover:underline">About</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
