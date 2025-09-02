export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 md:grid-cols-4 text-sm text-white/80">
        <div className="md:col-span-2">
          <div className="font-bold text-white">BOOK DIGEST</div>
          <p className="mt-2 max-w-prose">A space to rest, read, and reconnect, one page at a time.</p>
        </div>
        <div>
          <div className="font-semibold text-white">Get Involved</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/events">Book Club</a></li>
            <li><a className="hover:underline" href="/events#detox">Unplug Project</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Connect</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="hover:underline" href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer">Podcast</a></li>
            <li><a className="hover:underline" href="mailto:hello@book-digest.example">Email</a></li>
            <li><a className="hover:underline" href="/contact">Contact us</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-white/50 pb-8">© 2025 BOOK DIGEST</div>
    </footer>
  );
}
