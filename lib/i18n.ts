import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async () => {
  // Try to get locale from cookie first
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('locale')?.value as Locale | undefined;
  
  // Fall back to Accept-Language header
  let locale: Locale = defaultLocale;
  
  if (localeCookie && locales.includes(localeCookie)) {
    locale = localeCookie;
  } else {
    const headerStore = headers();
    const acceptLanguage = headerStore.get('accept-language') || '';
    
    // Check if user prefers Chinese
    if (acceptLanguage.includes('zh')) {
      locale = 'zh';
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
