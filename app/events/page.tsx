'use client';
import stats from '../../data/stats.json';
import { useEffect, useRef, useState } from 'react';
import SignupForm from '@/components/SignupForm';

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

function Counter({ target }: { target: number }) {
  const { ref, seen } = useOnceInView<HTMLDivElement>();
  const [value, setValue] = useState(0);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    if (!seen) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    const duration = 1200; // ms
    const start = performance.now();
    const startValue = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      setValue(Math.round(startValue + (target - startValue) * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [seen, target, reduceMotion]);
  return (
    <div ref={ref} className="text-4xl font-bold tabular-nums">{value}</div>
  );
}

export default function EventsPage() {
  const [activeLoc, setActiveLoc] = useState<'TW' | 'NL'>('TW');
  const endpointTW = process.env.NEXT_PUBLIC_FORMS_ENDPOINT_TW;
  const endpointNL = process.env.NEXT_PUBLIC_FORMS_ENDPOINT_NL;

  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">Events</h1>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-sm text-white/70">Reading Days</div>
            <Counter target={stats.readingDays} />
          </div>
          <div className="text-center">
            <div className="text-sm text-white/70">Book Clubs Held</div>
            <Counter target={stats.clubsHeld} />
          </div>
          <div className="text-center">
            <div className="text-sm text-white/70">Readers Joined</div>
            <Counter target={stats.readersJoined} />
          </div>
        </div>

        <div id="signup" className="mt-12">
          <h2 className="text-2xl font-bold">Join the Book Club</h2>
          <p className="text-white/80 mt-1">Choose your location and sign up. Only one submission is needed.</p>

          <div className="mt-4 inline-flex rounded-full border border-white/20 p-1 bg-white/5" role="tablist" aria-label="Location selector">
            <button role="tab" aria-selected={activeLoc==='TW'} onClick={() => setActiveLoc('TW')}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${activeLoc==='TW' ? 'bg-brand-pink text-brand-navy' : 'text-white'}`}>Taiwan</button>
            <button role="tab" aria-selected={activeLoc==='NL'} onClick={() => setActiveLoc('NL')}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${activeLoc==='NL' ? 'bg-brand-pink text-brand-navy' : 'text-white'}`}>Netherlands</button>
          </div>

          <div className="mt-6">
            {activeLoc === 'TW' ? (
              <SignupForm location="TW" endpoint={endpointTW} />
            ) : (
              <SignupForm location="NL" endpoint={endpointNL} />
            )}
          </div>
        </div>

        <div id="detox" className="mt-16">
          <h2 className="text-2xl font-bold">Digital Detox</h2>
          <p className="text-white/80 mt-2 max-w-prose">
            A gentle reset from constant notifications. Put your phone away for a while and join us in slow, mindful reading.
          </p>
          <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-5">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Pick a time window to unplug (start with 25 minutes).</li>
              <li>Place your phone out of reach; set it to Do Not Disturb.</li>
              <li>Read a book or reflect in a notebook. That’s it.</li>
            </ol>
            <p className="text-white/70 text-sm mt-4">Tip: Start small, be consistent. We’ll check in weekly at the book club.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
