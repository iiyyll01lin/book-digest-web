'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SignupForm from '@/components/SignupForm';

function JoinUsContent() {
  const t = useTranslations('events');
  const tJoin = useTranslations('joinus');
  const searchParams = useSearchParams();
  const [activeLocation, setActiveLocation] = useState<'TW' | 'NL'>('TW');

  // Read location from URL query param on mount
  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc === 'NL' || loc === 'TW') {
      setActiveLocation(loc);
    }
  }, [searchParams]);

  // Form background colors from poster themes with glass effect
  // Taiwan AD-16: warm coral/orange tones, Netherlands AD-15: teal/green tones
  const formBgClass = activeLocation === 'TW' 
    ? 'bg-[#d4735c]/30 backdrop-blur-xl border border-white/20 shadow-lg shadow-[#d4735c]/10' 
    : 'bg-[#2a6b6b]/30 backdrop-blur-xl border border-white/20 shadow-lg shadow-[#2a6b6b]/10';

  return (
    <section className="bg-brand-navy text-white min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold font-outfit">
            {tJoin('title')}
          </h1>
          <p className="mt-2 text-white/70">
            {tJoin('subtitle')}
          </p>
        </div>

        {/* Location Toggle */}
        <div className="mb-8">
          <div className="inline-flex bg-white/10 rounded-full p-1">
            <button
              onClick={() => setActiveLocation('TW')}
              className={`px-5 py-2 rounded-full font-medium transition-all text-sm ${
                activeLocation === 'TW'
                  ? 'bg-brand-pink text-brand-navy'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {t('taiwan')}
            </button>
            <button
              onClick={() => setActiveLocation('NL')}
              className={`px-5 py-2 rounded-full font-medium transition-all text-sm ${
                activeLocation === 'NL'
                  ? 'bg-brand-pink text-brand-navy'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {t('netherlands')}
            </button>
          </div>
        </div>

        {/* Book Club Registration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* Left: Event Poster */}
          <div className="flex">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
              <Image
                src={activeLocation === 'TW' ? '/images/elements/AD-16.png' : '/images/elements/AD-15.png'}
                alt={activeLocation === 'TW' ? 'Taiwan Book Club' : 'Netherlands Book Club'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Signup Form */}
          <div className="flex">
            <div className={`w-full rounded-2xl p-6 lg:p-8 transition-colors duration-300 ${formBgClass}`}>
              <SignupForm
                key={activeLocation}
                location={activeLocation}
                endpoint={
                  activeLocation === 'TW'
                    ? process.env.NEXT_PUBLIC_FORMS_ENDPOINT_TW || '/api/submit?loc=TW'
                    : process.env.NEXT_PUBLIC_FORMS_ENDPOINT_NL || '/api/submit?loc=NL'
                }
              />
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="my-20 relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent" />
        </div>

        {/* Digital Detox Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-outfit mb-10">
            {t('digitalDetox.title')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Detox Content */}
            <div className="space-y-8">
              <p className="text-white/85 text-lg leading-relaxed">
                {t('digitalDetox.description')}
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-pink text-brand-navy flex items-center justify-center font-bold">1</span>
                  <p className="text-white/80 pt-1">{t('digitalDetox.step1')}</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-pink text-brand-navy flex items-center justify-center font-bold">2</span>
                  <p className="text-white/80 pt-1">{t('digitalDetox.step2')}</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-pink text-brand-navy flex items-center justify-center font-bold">3</span>
                  <p className="text-white/80 pt-1">{t('digitalDetox.step3')}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-brand-pink">
                  <span className="font-semibold">💡 Tip:</span>{' '}
                  <span className="text-white/80">{t('digitalDetox.tip').replace('Tip: ', '')}</span>
                </p>
              </div>
            </div>

            {/* Right: Detox Poster */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                <Image
                  src="/images/elements/AD-17.png"
                  alt="Digital Detox"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function JoinUsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-brand-navy text-white min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }
    >
      <JoinUsContent />
    </Suspense>
  );
}
