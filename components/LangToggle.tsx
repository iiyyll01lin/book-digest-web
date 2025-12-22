'use client';

import { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default memo(function LangToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    // Get current path without locale prefix
    const segments = pathname.split('/');
    const currentLocale = segments[1];
    
    // Check if path starts with a locale
    const hasLocalePrefix = ['en', 'zh'].includes(currentLocale);
    
    let newPath: string;
    if (hasLocalePrefix) {
      // Replace locale in path
      segments[1] = newLocale;
      newPath = segments.join('/');
    } else {
      // Add locale prefix
      newPath = `/${newLocale}${pathname}`;
    }
    
    router.push(newPath);
  };

  return (
    <div
      className="fixed top-2 right-4 md:right-4 z-50 flex items-start"
    >
      <div
        className="inline-flex rounded-full border border-white/20 p-0.5 bg-brand-navy/90 backdrop-blur text-[10px] md:text-xs"
        role="tablist"
        aria-label="Language selector"
      >
      <button
        role="tab"
        aria-selected={locale === 'en'}
        onClick={() => switchLocale('en')}
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
        onClick={() => switchLocale('zh')}
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
});
