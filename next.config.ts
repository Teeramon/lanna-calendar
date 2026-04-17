import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/lanna-calendar',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
