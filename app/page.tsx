"use client";
import { useState } from 'react';
import Modal from '@/components/Modal';

export default function HomePage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-20 text-center">
          {/* Centered logo as per front page design */}
          <img src="/logo.svg" alt="Book Digest" className="mx-auto h-12 md:h-16 w-auto" />
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-white font-display leading-tight">
            A space to rest, read, and reconnect,
            <br /> one page at a time.
          </h1>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto">
            Come join the conversation!
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/events" className="inline-flex items-center rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-navy shadow hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-pink focus-visible:ring-offset-brand-navy">Book Club</a>
            <button onClick={() => setOpen(true)} className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy">Digital Detox</button>
          </div>

          {/* Keep scrapbook image but as a supporting visual below */}
          <div className="mt-10">
            <img src="/images/scrapbook.png" alt="Book club scrapbook" className="mx-auto w-full h-auto max-w-3xl rounded-lg shadow-xl"/>
          </div>
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Digital Detox">
        <p>
          Put your phone down, pick a book up. Join our community experiment to unplug and reclaim your attention.
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Simple daily prompts to reduce screen time</li>
          <li>Weekly check-ins with the club</li>
          <li>Optional: share reflections on what you noticed</li>
        </ul>
        <div className="mt-5 flex gap-3">
          <a href="/events#detox" className="inline-flex items-center rounded-full bg-brand-pink text-brand-navy px-4 py-2 font-semibold">I’m in</a>
          <button onClick={() => setOpen(false)} className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 font-semibold text-white">Maybe later</button>
        </div>
      </Modal>
    </>
  );
}
