'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <section className="bg-brand-navy text-white min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Our Story Section - Centered */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide font-outfit mb-8 text-center">
          {t('ourStory')}
        </h1>

        {/* Story Paragraphs - Centered */}
        <div className="space-y-6 text-white/90 leading-relaxed text-center font-outfit">
          <p className="whitespace-pre-line">
            {t('storyPara1')}
          </p>
          <p className="whitespace-pre-line">
            {t('storyPara2')}
          </p>
          <p className="whitespace-pre-line">
            {t('storyPara3')}
          </p>
        </div>

        {/* Why Us Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide font-outfit text-center mb-12">
            {t('whyUs')}
          </h2>

          {/* Reason 1 - A New Book Every Month */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-16">
            <div className="flex-shrink-0 relative w-40 md:w-48 h-40 md:h-48">
              <Image 
                src="/images/elements/whyus-06.png" 
                alt="" 
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold font-outfit text-white mb-3">
                {t('reason1Title')}
              </h3>
              <p className="text-white/80 leading-relaxed whitespace-pre-line font-outfit">
                {t('reason1Desc')}
              </p>
            </div>
          </div>

          {/* Reason 2 - Deep, delightful and diverse conversations */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-16">
            <div className="flex-shrink-0 relative w-40 md:w-48 h-40 md:h-48">
              <Image 
                src="/images/elements/whyus-07.png" 
                alt="" 
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold font-outfit text-white mb-3">
                {t('reason2Title')}
              </h3>
              <p className="text-white/80 leading-relaxed whitespace-pre-line font-outfit">
                {t('reason2Desc')}
              </p>
            </div>
          </div>

          {/* Reason 3 - Chill Vibes, No Pressure */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-16">
            <div className="flex-shrink-0 relative w-40 md:w-48 h-40 md:h-48">
              <Image 
                src="/images/elements/why us-08.png" 
                alt="" 
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold font-outfit text-white mb-3">
                {t('reason3Title')}
              </h3>
              <p className="text-white/80 leading-relaxed whitespace-pre-line font-outfit">
                {t('reason3Desc')}
              </p>
            </div>
          </div>

          {/* Join Us Button */}
          <div className="text-center mt-12">
            <Link
              href="/joinus"
              className="inline-flex items-center px-8 py-3 rounded-full bg-brand-pink text-brand-navy font-bold text-lg hover:brightness-110 transition-all uppercase tracking-wider"
            >
              {t('joinUsBtn')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
