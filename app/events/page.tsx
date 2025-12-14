'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import stats from '../../data/stats.json';
import { useEffect, useRef, useState, Suspense } from 'react';

function useOnceInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            setSeen(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen } as const;
}

function Counter({ target, label }: { target: number; label: string }) {
  const { ref, seen } = useOnceInView<HTMLDivElement>();
  const [value, setValue] = useState(0);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!seen) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      setValue(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [seen, target, reduceMotion]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-sm text-white/70 font-outfit uppercase tracking-wider">
        {label}
      </div>
      <div className="text-5xl md:text-6xl font-bold tabular-nums font-outfit mt-1">
        {value.toLocaleString()}
      </div>
    </div>
  );
}

// Event Section Component - Image only, no text overlay
function EventSection({
  image,
  title,
  description,
  signupUrl,
  imagePosition = 'left',
}: {
  image: string;
  title: string;
  description: string;
  signupUrl?: string;
  imagePosition?: 'left' | 'right';
}) {
  const imageBlock = (
    <div className="w-full lg:w-1/2">
      <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );

  const contentBlock = (
    <div className="w-full lg:w-1/2 flex flex-col justify-center">
      <h3 className="text-2xl md:text-3xl font-bold text-white font-outfit">
        {title}
      </h3>
      <p className="mt-6 text-white/80 leading-relaxed whitespace-pre-line text-lg">
        {description}
      </p>
      {signupUrl && (
        <div className="mt-8">
          <Link
            href={signupUrl}
            className="inline-flex items-center px-8 py-3 rounded-full bg-brand-pink text-brand-navy font-semibold hover:brightness-110 transition-all uppercase tracking-wider text-sm"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
      {imagePosition === 'left' ? (
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : (
        <>
          {contentBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

function EventsContent() {
  const t = useTranslations('events');

  return (
    <section className="bg-brand-navy text-white min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Stats Counters */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
          <Counter target={stats.readingDays} label={t('readingDays')} />
          <Counter target={stats.clubsHeld} label={t('clubsHeld')} />
          <Counter target={stats.readersJoined} label={t('readersJoined')} />
        </div>

        {/* Taiwan Book Club */}
        <div className="py-12">
          <EventSection
            image="/images/elements/AD-16.png"
            title="Upcoming Book Club in Taipei, Taiwan"
            description={`From bang to thud, this book traces how language grew from sensory experience into a uniquely human skill. With Pokémon, Japanese sounds, and child development as examples, it explores how meaning is built.

Perfect for fans of linguistics, kids' minds, or human vs. AI thinking.
Read with us this August!`}
            signupUrl="/joinus?location=TW"
            imagePosition="left"
          />
        </div>

        {/* Decorative Line */}
        <div className="relative h-px my-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent" />
        </div>

        {/* Netherlands Book Club */}
        <div className="py-12">
          <EventSection
            image="/images/elements/AD-15.png"
            title="Upcoming Book Club in Netherlands"
            description={`When you think of the Netherlands, what comes to mind? Windmills, bikes, tulips?

This book bursts the romanticised bubble and offers a sharp, accessible look into Dutch society — from social clique and gender diversity to workplace culture and sustainability.

Not perfect — but honest.`}
            signupUrl="/joinus?location=NL"
            imagePosition="right"
          />
        </div>

        {/* Decorative Line */}
        <div className="relative h-px my-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent" />
        </div>

        {/* Digital Detox */}
        <div id="detox" className="py-12">
          <EventSection
            image="/images/elements/AD-17.png"
            title="Upcoming Digital Detox"
            description={`For a few hours, we all unplugged.
We ate together, read together, laughed together, and most importantly, we are present.

Come unplug with us, your cozy little digital detox awaits!`}
            signupUrl="/joinus"
            imagePosition="left"
          />
        </div>

        {/* Join Us CTA */}
        <div className="text-center pt-12 mt-8 border-t border-white/10">
          <Link
            href="/joinus"
            className="inline-flex items-center px-10 py-4 rounded-full bg-brand-pink text-brand-navy font-bold text-lg hover:brightness-110 transition-all uppercase tracking-wider"
          >
            {t('registrationForm')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-brand-navy text-white min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }
    >
      <EventsContent />
    </Suspense>
  );
}
