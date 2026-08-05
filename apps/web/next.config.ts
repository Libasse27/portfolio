import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@portfolio/ui', '@portfolio/utils'],
};

export default nextConfig;
