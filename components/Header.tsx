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
      <div className="mx-auto max-w-6xl px-6 h-16 grid grid-cols-3 items-center">
        {/* Left group */}
  <nav aria-label="Primary left" className="hidden md:flex items-center gap-6 tracking-wider">
          <Link href="/books" className="hover:underline">Books</Link>
          <Link href="/events" className="hover:underline">Events</Link>
        </nav>

        {/* Center logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="inline-flex items-center">
            <img src="/logo.svg" alt="Book Digest logo" className="h-6 md:h-7 w-auto" />
          </Link>
        </div>

        {/* Right group + language toggle */}
        <div className="flex items-center justify-end gap-4">
          <nav aria-label="Primary right" className="hidden md:flex items-center gap-6 tracking-wider">
            <Link href="/events#signup" className="hover:underline">Join Us</Link>
            <Link href="/about" className="hover:underline">About</Link>
          </nav>
          <div className="inline-flex rounded-full border border-white/20 p-0.5">
            <button
              aria-label="Switch to English"
              onClick={() => switchLang('en')}
              className={`px-2.5 py-1 text-xs rounded-full ${lang==='en' ? 'bg-brand-pink text-brand-navy' : 'text-white'}`}
            >EN</button>
            <button
              aria-label="Switch to Chinese"
              onClick={() => switchLang('zh')}
              className={`px-2.5 py-1 text-xs rounded-full ${lang==='zh' ? 'bg-brand-pink text-brand-navy' : 'text-white'}`}
            >繁</button>
          </div>
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
