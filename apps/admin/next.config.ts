import type { NextConfig } from 'next';

// Outil interne (ADR 0011) : pas de CSP alignée sur celle d'apps/web
// (aucun script tiers, aucun contenu utilisateur non fiable affiché),
// mais les en-têtes de sécurité de base restent dus.
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@portfolio/validations'],
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
