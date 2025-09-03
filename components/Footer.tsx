export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/10">
      {/* Top divider with centered logo/text */}
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-white/30" />
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Book Digest" className="h-6 w-auto" />
            <span className="text-white font-extrabold tracking-wide">BOOK DIGEST</span>
          </div>
          <div className="h-px flex-1 bg-white/30" />
        </div>
      </div>

      {/* Four-column navigation */}
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-4 text-sm text-white/80">
        <div>
          <div className="font-semibold text-white">Events</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/events">Book Club</a></li>
            <li><a className="hover:underline" href="/events#detox">Unplug Project</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Get Involved</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/about#host">Be a Host</a></li>
            <li><a className="hover:underline" href="/#signup">Sign Up Forms</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">About Us</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/about">Our Story</a></li>
            <li><a className="hover:underline" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="hover:underline" href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer">Podcast</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Help and Support</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/contact">Contact us</a></li>
            <li><a className="hover:underline" href="/terms">Terms and conditions</a></li>
            <li><a className="hover:underline" href="/privacy">Privacy policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom pink copyright bar */}
      <div className="bg-brand-pink text-brand-navy text-center text-xs py-1">© 2025 BOOK DIGEST</div>
    </footer>
  );
}
