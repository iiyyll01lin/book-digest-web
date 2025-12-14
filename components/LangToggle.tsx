'use client';

import { useLocale } from '@/lib/useLocale';

export default function LangToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      onClick={toggleLocale}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-outfit uppercase tracking-wider border border-white/20 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
      aria-label={locale === 'en' ? 'Switch to Chinese' : '切換至英文'}
    >
      <span
        className={`${locale === 'en' ? 'text-white' : 'text-white/50'}`}
      >
        EN
      </span>
      <span className="text-white/30">|</span>
      <span
        className={`${locale === 'zh' ? 'text-white' : 'text-white/50'}`}
      >
        中
      </span>
    </button>
  );
}
