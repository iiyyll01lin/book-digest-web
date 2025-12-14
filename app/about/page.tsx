export default function AboutPage() {
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide font-outfit">Our Story</h1>
        <p className="mt-4 max-w-prose text-white/90 leading-relaxed">
          Book Digest is a community to rest, read, and reconnect. Each month we pick a book across genres—from fiction to psychology, world history to personal finance—and meet to discuss.
        </p>
        <h2 className="mt-10 text-2xl md:text-3xl font-bold tracking-wide font-outfit">Why Us</h2>
        <ul className="mt-4 list-disc pl-6 space-y-2 text-white/90">
          <li>A new book every month—discover outside your comfort zone.</li>
          <li>Friendly, moderated discussions; welcoming to new readers.</li>
          <li>Surprises often become the best part of the journey.</li>
        </ul>
      </div>
    </section>
  );
}
