const { FlatCompat } = require('@eslint/eslintrc');
// Config de base uniquement (TypeScript) : `next/core-web-vitals` fournit déjà
// react, react-hooks et jsx-a11y — les redéfinir via react-internal.js entre en
// conflit ("Cannot redefine plugin react").
const base = require('@portfolio/eslint-config');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  { ignores: ['next-env.d.ts'] }, // généré par Next.js, non modifiable
  ...base,
  ...compat.extends('next/core-web-vitals'),
];
