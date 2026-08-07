import { createHash } from 'crypto';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { themeInitScript } from './src/lib/theme';

// ThemeScript (src/components/ThemeScript.tsx) est un script inline statique
// (aucune entrée utilisateur, voir son commentaire) : autorisé par hash plutôt
// que par 'unsafe-inline' ou un nonce par requête (qui forcerait un rendu
// dynamique incompatible avec `output: 'standalone'` en génération statique).
const themeScriptHash = `'sha256-${createHash('sha256').update(themeInitScript).digest('base64')}'`;

// MODULE 17 règle 18 (en-têtes de sécurité). connect-src/script-src devront
// s'ouvrir aux domaines réels de Sentry/Plausible/Better Stack le jour où
// PHASE 7 les câble (docs/12-DevOps) — non fait ici, aucun compte créé.
const contentSecurityPolicy = [
  `default-src 'self'`,
  `script-src 'self' ${themeScriptHash}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob:`,
  `font-src 'self'`,
  `connect-src 'self'`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `upgrade-insecure-requests`,
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Image autonome (server.js + node_modules minimaux) : requis pour le
  // conteneur Docker de production (docker/production/Dockerfile), qui pose
  // DOCKER_BUILD=true avant `turbo run build`. Volontairement PAS activé par
  // défaut (clé absente plutôt que valeur undefined : exactOptionalPropertyTypes
  // interdit d'assigner explicitement undefined à `output`) : la copie tracée
  // des node_modules dans .next/standalone crée des liens symboliques, qui
  // échouent (EPERM) sous Windows sans mode développeur — ça casserait
  // `pnpm build` en local et en CI pour un mode dont seule l'image Docker a
  // besoin. Vercel ignore ce champ de toute façon (docs/14-Deployment).
  ...(process.env.DOCKER_BUILD === 'true' ? { output: 'standalone' as const } : {}),
  transpilePackages: [
    '@portfolio/ui',
    '@portfolio/utils',
    '@portfolio/i18n',
    '@portfolio/validations',
  ],
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
// ANALYZE=true pnpm build (MODULE 14) : diagnostic ponctuel du budget JS,
// pas de coût en production (no-op si la variable n'est pas positionnée).
const analyze = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

export default analyze(withNextIntl(nextConfig));
