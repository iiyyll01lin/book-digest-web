'use client';

import { useLocale } from '@/lib/useLocale';

export default function LangToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="fixed top-0 right-2 md:right-4 z-50 h-[96px] flex items-center"
    >
      <div
        className="inline-flex rounded-full border border-white/20 p-0.5 bg-brand-navy/90 backdrop-blur text-[10px] md:text-xs"
        role="tablist"
        aria-label="Language selector"
      >
      <button
        role="tab"
        aria-selected={locale === 'en'}
        onClick={() => setLocale('en')}
        className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full font-medium font-outfit uppercase tracking-wider transition-colors ${
          locale === 'en'
            ? 'bg-brand-pink text-brand-navy'
            : 'text-white hover:bg-white/10'
        }`}
      >
        EN
      </button>
      <button
        role="tab"
        aria-selected={locale === 'zh'}
        onClick={() => setLocale('zh')}
        className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full font-medium font-outfit uppercase tracking-wider transition-colors ${
          locale === 'zh'
            ? 'bg-brand-pink text-brand-navy'
            : 'text-white hover:bg-white/10'
        }`}
      >
        中文
      </button>
      </div>
    </div>
  );
}
