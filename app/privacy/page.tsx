'use client';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacy');
  return (
    <section className="bg-brand-navy text-white min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">{t('title')}</h1>
        
        <div className="mt-8 space-y-6 text-white/80 leading-relaxed">
          <p>
            {t('intro')}
          </p>
          
          <p>
            {t('contact')} <a href="mailto:bookdigest2020@gmail.com" className="text-brand-pink hover:underline">bookdigest2020@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
