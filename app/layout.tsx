import './globals.css';

// Root layout - minimal wrapper that passes children to locale layout
// The middleware handles locale detection and routing to /[locale]/*

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
