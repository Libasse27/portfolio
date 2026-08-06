'use client';

import { useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import type { About } from '@portfolio/validations';

type Metriques = About['metriques'];

/**
 * Isole la quantité approximative (préfixée par "~", ex. "~300",
 * "Depuis 2003 (~23 ans en 2026)") à animer en compteur ; le reste du texte
 * reste statique. Sans "~digits", la valeur est affichée telle quelle
 * (MODULE 11 : aucun chiffre ne doit être arrondi ou embelli à l'affichage).
 */
export function parseAnimatable(
  valeur: string,
): { prefix: string; digits: number; suffix: string } | null {
  const match = valeur.match(/~(\d+)/);
  const digits = match?.[1];
  if (!match || match.index === undefined || digits === undefined) return null;
  const digitsStart = match.index + 1;
  const digitsEnd = digitsStart + digits.length;
  return {
    prefix: valeur.slice(0, digitsStart),
    digits: Number(digits),
    suffix: valeur.slice(digitsEnd),
  };
}

function Counter({ target, durationMs = 900 }: { target: number; durationMs?: number }) {
  const [value, setValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  function start() {
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }
    const startTime = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - startTime) / durationMs, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return (
    <m.span onViewportEnter={start} viewport={{ once: true, amount: 0.6 }}>
      {value}
    </m.span>
  );
}

export function AnimatedCounters({ metriques }: { metriques: Metriques }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {metriques.map((metrique) => {
        const parsed = parseAnimatable(metrique.valeur);
        return (
          <div key={metrique.indicateur}>
            <dt className="text-app-text-muted text-sm">{metrique.indicateur}</dt>
            <dd className="font-heading text-app-text mt-1 text-2xl font-bold">
              {parsed ? (
                <>
                  {parsed.prefix}
                  <Counter target={parsed.digits} />
                  {parsed.suffix}
                </>
              ) : (
                metrique.valeur
              )}
            </dd>
            {metrique.note ? (
              <p className="text-app-text-muted mt-1 text-xs">{metrique.note}</p>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}
