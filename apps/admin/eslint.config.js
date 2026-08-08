const { FlatCompat } = require('@eslint/eslintrc');
const base = require('@portfolio/eslint-config');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  { ignores: ['next-env.d.ts'] },
  ...base,
  ...compat.extends('next/core-web-vitals'),
];
