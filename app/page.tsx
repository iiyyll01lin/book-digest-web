"use client";
import { useState } from 'react';
import Modal from '@/components/Modal';
import BookWall from '@/components/BookWall';
import WhyUs from '@/components/WhyUs';
import NotebookStrip from '@/components/NotebookStrip';

export default function HomePage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative bg-brand-navy overflow-hidden">
        {/* Decorative background elements (large screens) */}
        <div aria-hidden="true" className="pointer-events-none hidden lg:block absolute inset-0">
          <div className="absolute -top-20 -right-24 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-brand-pink/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pt-18 pb-18 lg:pt-22 lg:pb-22">
          <div className="grid items-center gap-8 md:grid-cols-2 text-center md:text-left">
            <div>
              {/* Centered logo as per front page design */}
              {/* <img src="/logo.svg" alt="Book Digest" className="mx-auto h-12 md:h-16 w-auto" /> */}
              <h1 className="mt-6 text-[2.5rem] md:text-[3rem] font-bold text-white font-display leading-[1.2] tracking-[0.01em]">
                A space to rest, read, and reconnect,
                <br /> one page at a time.
              </h1>
              <p className="mt-4 text-base md:text-lg text-white/90 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Come join the conversation!
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3">
                <a href="/events" className="inline-flex min-h-11 items-center rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-navy shadow hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-pink focus-visible:ring-offset-brand-navy">Book Club</a>
                <button onClick={() => setOpen(true)} className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy">Digital Detox</button>
              </div>
            </div>
            {/* Keep scrapbook image as right-side visual */}
            <div className="mt-10 md:mt-0">
              <img src="/images/notebook/notebook-03.png" alt="Book club scrapbook visual" className="mx-auto md:ml-auto md:mr-0 w-full h-auto max-w-3xl md:max-w-lg rounded-lg shadow-xl"/>
            </div>
          </div>
        </div>
      </section>

  {/* Book covers wall to match the design */}
  <BookWall />

  {/* Why Us section */}
  <WhyUs />

  {/* Notebook visual strip */}
  <NotebookStrip />

      <Modal open={open} onClose={() => setOpen(false)} title="Digital Detox">
        {/* Layout inspired by docs/ui/notebook-03 1.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
          {/* Visual column: notebook frame */}
          <div className="order-last md:order-first">
            <div className="rounded-xl overflow-hidden bg-white/10 border border-white/15 shadow">
              <img
                src="/images/notebook/notebook-03.png"
                alt="Notebook page visual"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          {/* Content column */}
          <div>
            <p>
              Put your phone down, pick a book up. Join our community experiment to unplug and reclaim your attention.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Simple daily prompts to reduce screen time</li>
              <li>Weekly check-ins with the club</li>
              <li>Optional: share reflections on what you noticed</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/events#detox" className="inline-flex items-center rounded-full bg-brand-pink text-brand-navy px-4 py-2 font-semibold">I’m in</a>
              <button onClick={() => setOpen(false)} className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 font-semibold text-white">Maybe later</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
