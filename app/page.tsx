import HomeHero from '@/components/HomeHero';
import BookWall from '@/components/BookWall';
import WhyUs from '@/components/WhyUs';
import SectionDivider from '@/components/SectionDivider';

export default function HomePage() {
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
