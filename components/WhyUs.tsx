export default function WhyUs() {
  const items = [
    {
      title: 'Monthly Picks',
      desc: 'A new book every month—from fiction to psychology and beyond.',
      icon: '/images/elements/whyus-06.png',
    },
    {
      title: 'Welcoming Community',
      desc: 'Friendly, moderated discussions for all reading levels.',
      icon: '/images/elements/whyus-07.png',
    },
    {
      title: 'Grow Together',
  desc: 'Try topics outside your comfort zone and be surprised.',
  icon: '/images/elements/why us-08.png',
    },
  ];
  return (
    <section aria-labelledby="why-us-heading" className="bg-brand-navy">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 id="why-us-heading" className="text-2xl md:text-3xl font-bold tracking-wide">Why Us</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <img src={it.icon} alt="" className="h-10 w-10 object-contain" />
                <div>
                  <div className="font-semibold text-white">{it.title}</div>
                  <p className="text-white/80 text-sm mt-1">{it.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
