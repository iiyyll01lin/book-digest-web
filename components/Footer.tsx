'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-brand-navy border-t border-white/10">
      {/* Top divider with centered logo/text - smaller */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/30" />
          <div className="flex items-center gap-2">
            <a href="https://www.instagram.com/bookdigest_tw/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Image src="/images/logo/IG iocn.PNG" alt="Instagram" width={48} height={48} className="h-6 w-auto" unoptimized />
            </a>
          </div>
          <div className="h-px flex-1 bg-white/30" />
        </div>
      </div>

      {/* Four-column navigation - with better spacing */}
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-4 text-sm text-white/80 font-outfit">
        <div>
          <div className="font-semibold text-white font-outfit uppercase tracking-wider text-xs">{t('events')}</div>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/events">{t('bookClub')}</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/events#detox">{t('unplugProject')}</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white font-outfit uppercase tracking-wider text-xs">{t('getInvolved')}</div>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/joinus">{t('beAHost')}</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/joinus">{t('signUpForms')}</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white font-outfit uppercase tracking-wider text-xs">{t('aboutUs')}</div>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/about">{t('ourStory')}</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="https://www.instagram.com/bookdigest_tw/" target="_blank" rel="noopener noreferrer">{t('instagram')}</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="https://podcasts.apple.com/podcast/1801844059" target="_blank" rel="noopener noreferrer">{t('podcast')}</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white font-outfit uppercase tracking-wider text-xs">{t('helpSupport')}</div>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="mailto:bookdigest2020@gmail.com">{t('contactUs')}</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/terms">{t('terms')}</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/privacy">{t('privacy')}</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom pink copyright bar - thinner */}
      <div className="bg-brand-pink text-brand-navy text-center text-[10px] py-0.5 font-outfit">{t('copyright')}</div>
    </footer>
  );
}
