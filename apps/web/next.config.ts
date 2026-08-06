import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@portfolio/ui',
    '@portfolio/utils',
    '@portfolio/i18n',
    '@portfolio/validations',
  ],
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
