import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

// jsdom n'implémente pas window.matchMedia — nécessaire pour ThemeToggle
// (détection de `prefers-color-scheme`).
window.matchMedia =
  window.matchMedia ||
  ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList);

// jsdom n'implémente pas IntersectionObserver — nécessaire pour les
// animations d'entrée de section et les compteurs animés (Framer Motion
// `whileInView`/`onViewportEnter`, MODULE 11/12). Signale "déjà visible"
// immédiatement plutôt que de simuler un vrai scroll.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(private readonly callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

window.IntersectionObserver =
  window.IntersectionObserver ||
  (IntersectionObserverStub as unknown as typeof IntersectionObserver);
