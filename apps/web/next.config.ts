import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

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
// ANALYZE=true pnpm build (MODULE 14) : diagnostic ponctuel du budget JS,
// pas de coût en production (no-op si la variable n'est pas positionnée).
const analyze = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

export default analyze(withNextIntl(nextConfig));
