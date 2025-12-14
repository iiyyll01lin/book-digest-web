export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/10">
      {/* Top divider with centered logo/text - smaller */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/30" />
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Book Digest" className="h-4 w-auto" />
            <span className="text-white font-bold tracking-wide text-sm font-outfit uppercase">BOOK DIGEST</span>
          </div>
          <div className="h-px flex-1 bg-white/30" />
        </div>
      </div>

      {/* Four-column navigation - more compact */}
      <div className="mx-auto max-w-6xl px-6 py-8 grid gap-6 md:grid-cols-4 text-xs text-white/80">
        <div>
          <div className="font-semibold text-white font-outfit uppercase tracking-wider text-xs">Events</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/events">Book Club</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/events#detox">Unplug Project</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white font-outfit uppercase tracking-wider text-xs">Get Involved</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/about#host">Be a Host</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/#signup">Sign Up Forms</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white font-outfit uppercase tracking-wider text-xs">About Us</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/about">Our Story</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer">Podcast</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white font-outfit uppercase tracking-wider text-xs">Help and Support</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/contact">Contact us</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/terms">Terms and conditions</a></li>
            <li><a className="hover:underline hover:text-brand-pink transition-colors" href="/privacy">Privacy policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom pink copyright bar - thinner */}
      <div className="bg-brand-pink text-brand-navy text-center text-[10px] py-0.5 font-outfit">© 2025 BOOK DIGEST</div>
    </footer>
  );
}
