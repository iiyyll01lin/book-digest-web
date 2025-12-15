import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    // Enable modern image formats (AVIF preferred, WebP fallback)
    formats: ['image/avif', 'image/webp'],
    // Define device size breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Define image sizes (for sizes attribute)
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256],
    // Configure external image sources here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Bundle splitting optimization
  experimental: {
    // Optimize specific package imports (tree-shaking)
    optimizePackageImports: ['lucide-react', 'next-intl'],
  },
  // Modular imports optimization
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  // Enable polling for file changes in development (useful in Docker/WSL/VM)
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
