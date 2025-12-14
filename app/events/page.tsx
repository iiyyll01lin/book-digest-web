'use client';
import { useSearchParams } from 'next/navigation';
import stats from '../../data/stats.json';
import { useEffect, useRef, useState, Suspense } from 'react';
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
      <div className="text-4xl md:text-5xl font-bold tabular-nums font-outfit mt-1">
        {value.toLocaleString()}
      </div>
    </div>
  );
}

// Event types definition
const EVENTS = [
  {
    id: 'TW',
    name: '台灣讀書會',
    nameEn: 'Taiwan Book Club',
    description: '每月一次的實體讀書會，一起享受閱讀的樂趣',
    image: '/images/elements/event-tw.png',
    location: 'TW' as const,
  },
  {
    id: 'NL',
    name: '荷蘭讀書會',
    nameEn: 'Netherlands Book Club',
    description: 'Monthly online book club for readers in Europe',
    image: '/images/elements/event-nl.png',
    location: 'NL' as const,
  },
];

function EventsContent() {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get('event');

  // Filter events based on URL parameter
  const filteredEvents = eventParam
    ? EVENTS.filter((e) => e.id.toLowerCase() === eventParam.toLowerCase())
    : EVENTS;

  // Set active location based on filtered event or default
  const [activeLoc, setActiveLoc] = useState<'TW' | 'NL'>(
    filteredEvents.length === 1 ? filteredEvents[0].location : 'TW'
  );

  const endpointTW =
    process.env.NEXT_PUBLIC_FORMS_ENDPOINT_TW || '/api/submit?loc=TW';
  const endpointNL =
    process.env.NEXT_PUBLIC_FORMS_ENDPOINT_NL || '/api/submit?loc=NL';

  // Get current event for display
  const currentEvent = EVENTS.find((e) => e.location === activeLoc);

  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold font-outfit">Events</h1>

        {/* Stats Counters */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Counter target={stats.readingDays} label="Reading Days" />
          <Counter target={stats.clubsHeld} label="Book Clubs Held" />
          <Counter target={stats.readersJoined} label="Readers Joined" />
        </div>

        {/* Event Selection and Sign Up */}
        <div id="signup" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold font-outfit">
            Join the Book Club
          </h2>
          <p className="text-white/80 mt-2">
            {filteredEvents.length === 1
              ? `歡迎報名 ${currentEvent?.name}`
              : 'Choose your location and sign up. Only one submission is needed.'}
          </p>

          {/* Only show tabs if not filtered to single event */}
          {filteredEvents.length > 1 && (
            <div
              className="mt-4 inline-flex rounded-full border border-white/20 p-1 bg-white/5"
              role="tablist"
              aria-label="Location selector"
            >
              {EVENTS.map((event) => (
                <button
                  key={event.id}
                  role="tab"
                  aria-selected={activeLoc === event.location}
                  onClick={() => setActiveLoc(event.location)}
                  className={`px-4 py-2 rounded-full text-sm font-medium font-outfit uppercase tracking-wider transition-colors ${
                    activeLoc === event.location
                      ? 'bg-brand-pink text-brand-navy'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {event.location === 'TW' ? 'Taiwan' : 'Netherlands'}
                </button>
              ))}
            </div>
          )}

          {/* Event Card with Image and Form - Aligned */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Event Image */}
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img
                src={currentEvent?.image || '/images/placeholder-cover.svg'}
                alt={currentEvent?.name || 'Event'}
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold font-outfit">
                  {currentEvent?.name}
                </h3>
                <p className="text-white/70 mt-2">{currentEvent?.description}</p>
              </div>
            </div>

            {/* Sign Up Form */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold font-outfit mb-4">
                報名表單 / Registration Form
              </h3>
              {activeLoc === 'TW' ? (
                <SignupForm location="TW" endpoint={endpointTW} />
              ) : (
                <SignupForm location="NL" endpoint={endpointNL} />
              )}
            </div>
          </div>
        </div>

        {/* Digital Detox Section */}
        <div id="detox" className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold font-outfit">
            Digital Detox
          </h2>
          <p className="text-white/80 mt-2 max-w-prose">
            A gentle reset from constant notifications. Put your phone away for
            a while and join us in slow, mindful reading.
          </p>
          <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-5">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Pick a time window to unplug (start with 25 minutes).</li>
              <li>Place your phone out of reach; set it to Do Not Disturb.</li>
              <li>Read a book or reflect in a notebook. That&apos;s it.</li>
            </ol>
            <p className="text-white/70 text-sm mt-4">
              Tip: Start small, be consistent. We&apos;ll check in weekly at the book
              club.
            </p>
          </div>
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
