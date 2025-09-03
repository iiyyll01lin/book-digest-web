/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable polling for file changes (useful in Docker/WSL/VM)
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Delay before rebuilding
    };
    return config;
  },
};

module.exports = nextConfig;
