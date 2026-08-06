// Seuils volontairement conservateurs, PAS un 100/100/100/100 immédiat
// (ADR 0004) : MODULE 17.12 veut Lighthouse bloquant, mais l'exiger parfait
// bloquerait la CI sur des points hors périmètre (accessibilité complète =
// Phase 6 ; Projets/FAQ = contenu manquant). La mesure locale (Windows) a
// été bloquée par un bug connu de chrome-launcher au nettoyage
// (EPERM sur le dossier temp après fermeture de Chrome — l'audit
// s'exécute jusqu'au bout, seul le nettoyage échoue) : le premier run CI
// (Linux) sert de mesure de référence réelle. À resserrer vers 100 une
// fois cette mesure connue.
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 30000,
      url: ['http://localhost:3000/fr', 'http://localhost:3000/en'],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.8 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};
