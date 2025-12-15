import HomeHero from '@/components/HomeHero';
import BookWall from '@/components/BookWall';
import WhyUs from '@/components/WhyUs';
import SectionDivider from '@/components/SectionDivider';
import { setRequestLocale } from '@/lib/i18n';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HomeHero />

      {/* Section Divider */}
      <SectionDivider color="white" className="mx-auto max-w-6xl px-6" />

      {/* Book Wall - showing all book covers */}
      <BookWall />

      {/* Section Divider */}
      <SectionDivider color="white" className="mx-auto max-w-6xl px-6" />

      {/* Why Us section */}
      <WhyUs />
    </>
  );
}
