import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

// Décorateurs NestJS (métadonnées de type pour l'injection de dépendances) :
// esbuild (transform par défaut de Vitest) ne supporte pas
// `emitDecoratorMetadata`. `unplugin-swc` est la solution documentée par
// NestJS pour Vitest (voir .swcrc).
export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
    },
  },
  plugins: [swc.vite()],
});
