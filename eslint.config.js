// Config de secours pour lint-staged (exécuté depuis la racine du monorepo).
// L'audit de référence reste `pnpm lint`, qui utilise la config propre à
// chaque package (packages/*/eslint.config.cjs, apps/*/eslint.config.js).
const base = require('@portfolio/eslint-config');
const reactInternal = require('@portfolio/eslint-config/react-internal');

module.exports = [
  { ignores: ['**/dist/**', '**/.next/**', '**/coverage/**', '**/.turbo/**', '**/node_modules/**'] },
  ...base,
  ...reactInternal,
];
