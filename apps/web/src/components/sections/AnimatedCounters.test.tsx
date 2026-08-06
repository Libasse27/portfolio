import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { profil } from '@/lib/content';
import { AnimatedCounters, parseAnimatable } from './AnimatedCounters';

describe('parseAnimatable', () => {
  it('isole la quantité approximative préfixée par "~"', () => {
    expect(parseAnimatable('~300')).toEqual({ prefix: '~', digits: 300, suffix: '' });
  });

  it('isole "~digits" au milieu d’un texte plus long', () => {
    expect(parseAnimatable('Depuis 2003 (~23 ans en 2026)')).toEqual({
      prefix: 'Depuis 2003 (~',
      digits: 23,
      suffix: ' ans en 2026)',
    });
  });

  it('retourne null sans motif "~digits"', () => {
    expect(parseAnimatable('3 confirmés à ce stade')).toBeNull();
  });
});

describe('AnimatedCounters', () => {
  it('affiche chaque indicateur avec son libellé', () => {
    render(<AnimatedCounters metriques={profil.metriques} />);
    for (const metrique of profil.metriques) {
      expect(screen.getByText(metrique.indicateur)).toBeInTheDocument();
    }
  });

  it('affiche telle quelle une valeur sans motif animable', () => {
    render(<AnimatedCounters metriques={profil.metriques} />);
    const staticMetrique = profil.metriques.find((m) => parseAnimatable(m.valeur) === null);
    expect(staticMetrique).toBeDefined();
    expect(screen.getByText(staticMetrique!.valeur)).toBeInTheDocument();
  });
});
