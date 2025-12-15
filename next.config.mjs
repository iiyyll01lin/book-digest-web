import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 圖片優化設定
  images: {
    // 啟用現代圖片格式（AVIF 優先，WebP 備用）
    formats: ['image/avif', 'image/webp'],
    // 定義裝置尺寸斷點
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // 定義圖片尺寸（用於 sizes 屬性）
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256],
    // 如果有使用外部圖片來源，在這裡配置
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable polling for file changes (useful in Docker/WSL/VM)
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Delay before rebuilding
    };
    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
