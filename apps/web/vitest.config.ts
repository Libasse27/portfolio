import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  // tsconfig.json fixe jsx:"preserve" (exigé par le compilateur SWC de Next.js) ;
  // esbuild doit recevoir explicitement le mode automatique pour les tests Vitest.
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
