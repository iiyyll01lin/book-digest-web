import { locales, setRequestLocale } from '@/lib/i18n';
import JoinUsClient from './client';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function JoinUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <JoinUsClient />;
}
