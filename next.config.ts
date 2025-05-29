import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ik.imagekit.io'],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
