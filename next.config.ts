import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  // Ignore TypeScript build errors (use this only temporarily)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Ignore ESLint errors during builds (use this only temporarily)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Other Next.js config options can go here
  experimental: {
    // appDir: true, // Enable the new app directory feature if using Next.js 13+
  },
};

export default nextConfig;
