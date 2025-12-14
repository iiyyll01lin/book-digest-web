'use client';

import { useCallback, useEffect, useState } from 'react';

const LOCALE_COOKIE_NAME = 'locale';
const SUPPORTED_LOCALES = ['en', 'zh'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Read from cookie on mount
    const cookieLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
      ?.split('=')[1] as Locale | undefined;

    if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
      setLocaleState(cookieLocale);
    } else {
      // Check browser language
      const browserLang = navigator.language;
      if (browserLang.startsWith('zh')) {
        setLocaleState('zh');
      }
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    // Set cookie with 1 year expiry
    document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setLocaleState(newLocale);
    // Reload to apply new locale
    window.location.reload();
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'zh' : 'en');
  }, [locale, setLocale]);

  return {
    locale,
    setLocale,
    toggleLocale,
    isEnglish: locale === 'en',
    isChinese: locale === 'zh',
  };
}
