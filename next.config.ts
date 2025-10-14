import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export to enable SSR for StoryBlok Visual Editor
  // output: 'export', // REMOVED - this was causing the hydration mismatch
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
