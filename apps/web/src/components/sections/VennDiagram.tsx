'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { About } from '@portfolio/validations';

type Poles = About['positionnement']['poles'];
type Intersections = About['positionnement']['intersections'];

// Géométrie Venn 3 cercles classique (rayon 100, viewBox 300×300) : centres
// disposés en triangle équilatéral pour garantir les 4 zones de recouvrement.
const CIRCLES = {
  dev: { cx: 150, cy: 100 },
  compta: { cx: 100, cy: 200 },
  infra: { cx: 200, cy: 200 },
} as const;
const RADIUS = 100;

// Centroïdes approximatifs des zones de recouvrement, pour positionner les
// boutons interactifs superposés au SVG (en % du conteneur).
const INTERSECTION_POSITIONS: Record<string, { left: string; top: string }> = {
  'compta-dev': { left: '41.5%', top: '50%' },
  'dev-infra': { left: '58.5%', top: '50%' },
  'compta-infra': { left: '50%', top: '66.5%' },
  'compta-dev-infra': { left: '50%', top: '56%' },
};

function key(poles: readonly string[]) {
  return [...poles].sort().join('-');
}

export function VennDiagram({
  poles,
  intersections,
}: {
  poles: Poles;
  intersections: Intersections;
}) {
  const t = useTranslations('TripleExpertise');
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const active =
    intersections.find((intersection) => key(intersection.poles) === activeKey) ?? null;
  const poleById = (id: string) => poles.find((pole) => pole.id === id);

  return (
    <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden="true">
          <circle cx={CIRCLES.dev.cx} cy={CIRCLES.dev.cy} r={RADIUS} className="fill-pole-dev/20" />
          <circle
            cx={CIRCLES.compta.cx}
            cy={CIRCLES.compta.cy}
            r={RADIUS}
            className="fill-pole-compta/20"
          />
          <circle
            cx={CIRCLES.infra.cx}
            cy={CIRCLES.infra.cy}
            r={RADIUS}
            className="fill-pole-infra/20"
          />
          <circle
            cx={CIRCLES.dev.cx}
            cy={CIRCLES.dev.cy}
            r={RADIUS}
            className="stroke-pole-dev fill-none"
            strokeWidth={1.5}
          />
          <circle
            cx={CIRCLES.compta.cx}
            cy={CIRCLES.compta.cy}
            r={RADIUS}
            className="stroke-pole-compta fill-none"
            strokeWidth={1.5}
          />
          <circle
            cx={CIRCLES.infra.cx}
            cy={CIRCLES.infra.cy}
            r={RADIUS}
            className="stroke-pole-infra fill-none"
            strokeWidth={1.5}
          />
        </svg>

        <span className="text-pole-dev absolute left-1/2 top-[15%] -translate-x-1/2 text-xs font-semibold sm:text-sm">
          {poleById('dev')?.nom}
        </span>
        <span className="text-pole-compta absolute bottom-[10%] left-[14%] text-xs font-semibold sm:text-sm">
          {poleById('compta')?.nom}
        </span>
        <span className="text-pole-infra absolute bottom-[10%] right-[10%] text-xs font-semibold sm:text-sm">
          {poleById('infra')?.nom}
        </span>

        {intersections.map((intersection) => {
          const intersectionKey = key(intersection.poles);
          const position = INTERSECTION_POSITIONS[intersectionKey];
          if (!position) return null;
          const isActive = activeKey === intersectionKey;

          return (
            <button
              key={intersectionKey}
              type="button"
              onMouseEnter={() => setActiveKey(intersectionKey)}
              onFocus={() => setActiveKey(intersectionKey)}
              onClick={() => setActiveKey(intersectionKey)}
              aria-label={t('intersectionLabel', { titre: intersection.titre })}
              aria-pressed={isActive}
              style={{ left: position.left, top: position.top }}
              className={[
                'absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2',
                'focus-visible:ring-primary outline-none transition-colors focus-visible:ring-2 sm:h-11 sm:w-11',
                // border-app-text-muted/75 (pas /40) : sous ce seuil, le contour du
                // bouton inactif tombe sous 3:1 (WCAG 1.4.11, contraste non-textuel
                // des composants d'interface) — 2.28:1 en sombre, 1.77:1 en clair à
                // /40 — ADR 0005 passe 2.
                isActive
                  ? 'border-app-text bg-app-surface/70'
                  : 'border-app-text-muted/75 hover:border-app-text-muted bg-transparent',
              ].join(' ')}
            />
          );
        })}
      </div>

      <div className="min-h-32">
        {active ? (
          <div>
            <h3 className="font-heading text-app-text text-lg font-semibold">{active.titre}</h3>
            <p className="text-app-text-muted mt-2">{active.illustration}</p>
          </div>
        ) : (
          <p className="text-app-text-muted italic">{t('hint')}</p>
        )}
      </div>
    </div>
  );
}
