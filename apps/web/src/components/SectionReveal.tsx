'use client';

import { m } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Entrée de section (MODULE 12 : fade/slide, 300-600ms, easing
 * cubic-bezier(0.16,1,0.3,1)). `prefers-reduced-motion` est géré une seule
 * fois via <MotionConfig reducedMotion="user"> dans le layout racine.
 * `m` (pas `motion`) : les fonctionnalités d'animation sont chargées une
 * seule fois via <LazyMotion> dans le layout racine (ADR 0004, budget JS).
 */
export function SectionReveal({ children }: { children: ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
