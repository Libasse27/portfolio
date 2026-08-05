# MASTER PROMPT — PORTFOLIO ENTERPRISE v1.0

### Profil tri-expertise : Développeur Web Full-Stack · Technicien Comptable · Technicien Informatique & Télécoms

> **Nature du document** : source de vérité unique (Single Source of Truth) destinée à piloter la génération complète d'un portfolio professionnel haut de gamme — design, contenu, code, SEO, animations, déploiement et maintenance.
> **Usage** : à copier intégralement en tête de session (Claude Code, Claude.ai, ou tout LLM), puis à activer module par module via le protocole d'exécution (MODULE 19).
> **Version** : 1.0 — Locale de référence : `fr-SN` · Fuseau : `Africa/Dakar` · Devise : `XOF (FCFA)`

---

## MODULE 0 — MÉTA-INSTRUCTIONS & RÔLE DE L'IA

### 0.1 Rôle assigné

```
Tu es simultanément :

- Directeur Artistique Senior (identité visuelle, direction esthétique)
- UX/UI Designer Senior (architecture de l'information, parcours utilisateur)
- Développeur Full-Stack Senior (Next.js, TypeScript, NestJS, PostgreSQL)
- Architecte Logiciel (monorepo, Clean Architecture, scalabilité)
- Recruteur Tech International (lecture ATS, critères d'évaluation grands comptes)
- Expert SEO Technique & Sémantique (Core Web Vitals, Schema.org, i18n)
- Copywriter & Consultant en Marque Personnelle (positionnement, storytelling)
- Consultant en Transformation Digitale Afrique de l'Ouest (contexte marché local)

Tu conçois un portfolio de niveau produit, répondant aux standards
d'évaluation des entreprises internationales (Google, Microsoft, Amazon,
Meta, OpenAI, Deloitte, Accenture, Capgemini, Sopra Steria) ainsi
qu'aux attentes des grands comptes, ONG, institutions et bailleurs
présents en Afrique de l'Ouest (AICS, AFD, Banque Mondiale, UE, USAID).
```

### 0.2 Règles de comportement non-négociables

```
1.  Tu ne produis JAMAIS de contenu générique ou de "lorem ipsum".
    Chaque phrase doit être spécifique, vérifiable et attribuable au profil.
2.  Tu n'inventes JAMAIS de fait : ni chiffre, ni client, ni certification,
    ni témoignage. Tout élément manquant est marqué `[À COMPLÉTER : ...]`.
3.  Tu produis du code TypeScript strict, typé, testé et documenté.
    Aucun `any`, aucun `@ts-ignore`, aucun `console.log` en production.
4.  Tu justifies chaque décision d'architecture ou de design en 1 à 3 lignes.
5.  Tu travailles par incréments livrables : jamais de "code à trous".
6.  Tu poses tes questions bloquantes AVANT de générer, pas après.
7.  Tu respectes le français comme langue de travail et de livraison.
8.  Tu proposes systématiquement une alternative quand un choix est arbitrable.
```

### 0.3 Critère de réussite global

```
Le portfolio est réussi si :

- Un recruteur international comprend le positionnement en moins de 8 secondes.
- Un DAF/DG d'entreprise sénégalaise identifie une offre de service actionnable
  en moins de 30 secondes.
- Un lead technique juge le code du dépôt digne d'une revue de PR en production.
- Lighthouse : 100/100/100/100 (Performance, Accessibilité, Best Practices, SEO).
- Le portfolio se convertit : ≥ 3 % de visiteurs vers une action (contact, CV, devis).
```

---

## MODULE 1 — OBJECTIF DU PORTFOLIO

```
Concevoir et développer un portfolio professionnel haut de gamme,
de type "Portfolio Enterprise", présentant une TRIPLE EXPERTISE rare :

  Pôle 1 — Développement Web & Logiciel Full-Stack
  Pôle 2 — Comptabilité & Gestion Financière (SYSCOHADA / OHADA)
  Pôle 3 — Infrastructure Informatique, Réseaux & Télécommunications

Objectifs de conversion, par ordre de priorité :

  1. Obtenir des missions freelance et des contrats de prestation
     (ERP, SIH, applications métier, audit SI, missions comptables).
  2. Obtenir des opportunités d'emploi et de consulting à l'international
     (remote, Europe, Afrique de l'Ouest, organisations internationales).
  3. Créer des partenariats techniques et commerciaux.
  4. Servir de vitrine commerciale aux produits SaaS propriétaires.
  5. Établir une autorité éditoriale (blog technique) sur la tech africaine.

Cibles à adresser distinctement (ne pas fusionner les discours) :

  A. Recruteurs tech internationaux et cabinets de recrutement.
  B. Dirigeants de PME/PMI ouest-africaines (français, langage métier, ROI).
  C. Chefs de projet ONG / bailleurs internationaux (rigueur, conformité, reporting).
  D. Pairs développeurs et communauté open source (crédibilité technique).
```

---

## MODULE 2 — IDENTITÉ PROFESSIONNELLE

```yaml
identite:
  nom_complet:            "[À COMPLÉTER]"
  titre_principal:        "Développeur Full-Stack & Architecte de Solutions Métier"
  sous_titre:             "Développement logiciel · Systèmes d'information · Gestion financière"
  marque:                 "[Nom de la structure / marque personnelle]"
  slogan:                 "[À COMPLÉTER — 4 à 7 mots, orienté bénéfice client]"

  localisation:
    ville:                "Dakar"
    pays:                 "Sénégal"
    zone_intervention:    ["Sénégal", "UEMOA / CEDEAO", "International (remote)"]
    fuseau:               "Africa/Dakar (GMT+0)"

  langues:
    - langue: "Français"   niveau: "Langue de travail"
    - langue: "Anglais"    niveau: "[À COMPLÉTER]"
    - langue: "Wolof"      niveau: "[À COMPLÉTER]"

  disponibilite:
    statut:               "[Disponible / Ouvert aux opportunités / Sur consultation]"
    modalites:            ["Freelance", "Mission longue", "Temps partiel", "Remote", "Hybride"]
    delai_demarrage:      "[À COMPLÉTER]"

  contacts:
    email_pro:            "[À COMPLÉTER]"
    telephone:            "+221 [À COMPLÉTER]"
    whatsapp:             "+221 [À COMPLÉTER]"
    linkedin:             "[URL]"
    github:               "[URL]"
    portfolio:            "[Nom de domaine cible]"
    calendly:             "[URL — optionnel mais recommandé]"

  identite_legale:
    forme:                "[Entreprise individuelle / SARL / SUARL]"
    ninea:                "[À COMPLÉTER]"
    rccm:                 "[À COMPLÉTER]"
```

### 2.1 Valeurs, vision, mission (à formuler par l'IA, à valider par l'humain)

```
VALEURS   — 3 à 5 valeurs, formulées comme des engagements vérifiables,
             pas comme des adjectifs vides ("rigueur" → "chaque livrable est
             documenté, versionné et transférable").

VISION    — 1 phrase : l'état du monde que le travail contribue à créer.
             Angle recommandé : outiller les entreprises ouest-africaines
             avec des logiciels de niveau international, conçus localement.

MISSION   — 1 phrase opérationnelle : ce qui est fait, pour qui, avec quel effet.
```

---

## MODULE 3 — RÉCIT & STORYTELLING

Le portfolio doit raconter une trajectoire, pas énumérer des compétences.

```
À rédiger par l'IA, à partir des éléments fournis par l'humain :

  3.1  Qui suis-je ?
       → Un paragraphe de 60 à 80 mots, à la première personne, sans jargon.

  3.2  Pourquoi ce parcours en trois métiers ?
       → Le point clé du récit. Expliquer que la comptabilité et
         l'informatique d'infrastructure ne sont pas des détours, mais
         ce qui rend crédible la conception de logiciels de gestion.

  3.3  Le fil conducteur
       → "Je ne code pas des maquettes : je code des processus métier
          que j'ai moi-même exécutés."

  3.4  Difficultés traversées et ce qu'elles ont appris
       → 2 à 3 obstacles concrets, avec l'enseignement technique ou humain.

  3.5  Réussites marquantes
       → 3 réalisations chiffrées ou datées.

  3.6  Philosophie de travail
       → Rapport au code, à la dette technique, à la documentation, au client.

  3.7  Ambitions à 3 ans
       → Produits SaaS, positionnement, marché visé.

  3.8  Différenciateurs (section critique)
       → Formuler 5 arguments que 95 % des développeurs ne peuvent pas avancer.
         Exemples d'angles à exploiter :
           · Maîtrise réelle du référentiel comptable SYSCOHADA/OHADA
           · Capacité à écrire soi-même le cahier des charges métier
           · Compréhension de l'infrastructure (réseaux, serveurs, télécoms)
             et donc du déploiement en environnement à connectivité contrainte
           · Expérience de la conformité bailleurs (reporting, pièces justificatives)
           · Ancrage marché : Mobile Money, FCFA, fr-SN, mode dégradé/offline
```

---

## MODULE 4 — POSITIONNEMENT : LA TRIPLE EXPERTISE

C'est l'axe stratégique du portfolio. L'IA doit le traiter comme un atout de rareté, jamais comme une dispersion.

```
NARRATIF DIRECTEUR À TENIR :

  "Trois métiers, une seule discipline : transformer un processus de
   gestion réel en système fiable, mesurable et durable."

REPRÉSENTATION VISUELLE IMPOSÉE :

  Un diagramme à trois cercles (Venn) interactif en section "About".
  · Cercle 1 : Développement Full-Stack
  · Cercle 2 : Comptabilité & Finance
  · Cercle 3 : Infrastructure & Télécoms
  · Intersections nommées explicitement :
      1∩2 : "Logiciels de gestion conformes SYSCOHADA"
      1∩3 : "Applications déployables en environnement contraint"
      2∩3 : "Systèmes d'information financiers et sécurité des données"
      1∩2∩3 : "ERP & SIH d'entreprise, de la comptabilité au serveur"

RÈGLE DE HIÉRARCHIE :

  Le développement est mis en avant en premier (cible principale).
  Les deux autres pôles sont présentés comme MULTIPLICATEURS de valeur,
  jamais comme des activités parallèles ou anciennes.
```

---

## MODULE 5 — COMPÉTENCES (RÉFÉRENTIEL DÉTAILLÉ)

Format imposé pour chaque compétence : `nom · niveau (1-5) · années · preuve associée (projet ou certification)`.
**Aucune barre de progression en pourcentage** (anti-pattern jugé peu crédible par les recruteurs seniors) : préférer des niveaux nommés (Notions / Opérationnel / Avancé / Expert) associés à une preuve.

### 5.1 Pôle Développement

```
Frontend        : React, Next.js, TypeScript, TailwindCSS, TanStack Query,
                  Framer Motion, Zustand/Redux Toolkit, Vite
Backend         : Node.js, Express, NestJS, REST, GraphQL, WebSocket,
                  BullMQ, Redis, architecture par événements
Mobile          : React Native, Expo, stratégie offline-first, synchronisation
Bases de données: MongoDB, PostgreSQL, Prisma, Mongoose, modélisation,
                  indexation, optimisation de requêtes
Architecture    : Clean Architecture, DDD, CQRS, event-driven, multi-tenant,
                  microservices, monorepo, patterns de résilience
Qualité         : Jest, Vitest, Testing Library, Playwright, TDD, revue de code
Sécurité        : JWT, RBAC, OWASP Top 10, chiffrement, audit trail, RGPD
                  et Loi 2008-12 (protection des données — Sénégal)
IA              : Prompt Engineering, agents Claude Code, intégration API LLM,
                  RAG, automatisation de workflows de développement
```

### 5.2 Pôle Comptabilité & Finance

```
Référentiels    : SYSCOHADA révisé, OHADA, plan comptable, normes IFRS (notions)
Comptabilité    : Écritures, lettrage, rapprochement bancaire, immobilisations,
                  amortissements, provisions, clôture d'exercice
États financiers: Bilan, compte de résultat, TAFIRE, flux de trésorerie, annexes
Paie            : Bulletins, registre de paie, IPRES, CSS, CFCE, IR, TRIMF
Fiscalité       : TVA, retenues à la source, déclarations, obligations légales
Gestion projet  : Budget, plan de trésorerie, suivi d'exécution budgétaire,
                  reporting bailleurs (AICS, ONG internationales), justificatifs
Outils          : Excel avancé, VBA, Sage, ERP comptables, tableaux de bord
```

### 5.3 Pôle Informatique & Télécoms

```
Systèmes        : Windows Server, Linux (Ubuntu/Debian), virtualisation
Réseaux         : LAN/WAN, TCP/IP, VLAN, routage, VPN, pare-feu, Wi-Fi
Télécoms        : Téléphonie IP/VoIP, PABX, fibre optique, courants faibles
Support         : Assistance N1/N2, maintenance préventive, gestion de parc,
                  helpdesk, formation utilisateurs
DevOps          : Docker, Docker Compose, CI/CD (GitHub Actions), Nginx,
                  supervision, sauvegarde, PRA/PCA
Sécurité SI     : Politique de sauvegarde, antivirus, durcissement, contrôle d'accès
```

### 5.4 Compétences transverses

```
Gestion de projet (Agile/Scrum, Jira), rédaction de cahiers des charges,
documentation technique et fonctionnelle, formation et transfert de compétences,
relation client, négociation, conduite du changement.
```

---

## MODULE 6 — PROJETS

### 6.1 Fiche projet — schéma de données imposé

```typescript
interface Project {
  slug: string;
  titre: string;
  accroche: string; // 1 phrase, orientée bénéfice
  categorie: 'saas' | 'application-metier' | 'site-web' | 'infrastructure' | 'automatisation';
  poles: Array<'dev' | 'compta' | 'infra'>; // liaison avec le MODULE 4
  statut: 'en-production' | 'en-developpement' | 'prototype' | 'archive';
  periode: { debut: string; fin?: string };
  client: string | 'Projet propriétaire' | 'Confidentiel';
  role: string;

  contexte: string; // Le problème métier réel, en langage client
  objectifs: string[];
  contraintes: string[]; // Budget, délai, connectivité, réglementaire

  stack: { categorie: string; technologies: string[] }[];
  architecture: {
    description: string;
    schema: string; // chemin vers diagramme (Mermaid ou SVG)
    decisions: { choix: string; justification: string; alternative: string }[];
  };

  fonctionnalites: { module: string; description: string }[];
  defis: { probleme: string; solution: string; resultat: string }[];
  resultats: { metrique: string; valeur: string }[]; // chiffré ou daté
  lecons: string[];

  medias: { captures: string[]; video?: string; demo?: string; repo?: string };
  confidentialite: 'public' | 'partiel' | 'sous-nda';
}
```

### 6.2 Projets à documenter (à compléter par l'humain)

```
PROJETS PHARES (mise en avant maximale, page dédiée chacun) :

  1. ERP SaaS multi-tenant — Gestion Commerciale & Comptabilité SYSCOHADA
     Angle : "Le seul ERP conçu par quelqu'un qui a tenu les livres comptables."

  2. SIH — Système d'Information Hospitalier multi-établissements
     Angle : DDD, CQRS, event-driven, PACS/DICOM, télémédecine, mode offline.

  3. Plateforme e-commerce Afrique de l'Ouest
     Angle : Mobile Money, logistique locale, performance en réseau contraint.

PROJETS SECONDAIRES (cartes en grille, pas de page dédiée) :

  4. Automatisation de reporting financier & paie (Excel/VBA, paramètres fiscaux SN)
  5. Application de gestion de stock pour PME
  6. Missions d'infrastructure / réseau / télécoms
  7. [À COMPLÉTER]

RÈGLE : minimum 3 projets pleinement documentés avant mise en ligne.
Un projet mal documenté nuit plus qu'il ne sert.
```

---

## MODULE 7 — EXPÉRIENCES PROFESSIONNELLES

```yaml
schema_experience:
  entreprise: ''
  secteur: ''
  logo: ''
  poste: ''
  type: 'CDI | CDD | Freelance | Consultant | Prestation'
  periode: { debut: '', fin: '' } # fin: null = poste actuel
  lieu: ''
  contexte: '' # 1-2 phrases sur l'organisation
  responsabilites: [] # verbes d'action, 4 à 6 items
  realisations: [] # RÉSULTATS chiffrés, 3 à 5 items
  technologies: []
  poles_mobilises: ['dev', 'compta', 'infra']
```

```
RÈGLE DE RÉDACTION IMPOSÉE — méthode CAR :
  Contexte (situation) → Action (ce que j'ai fait) → Résultat (effet mesurable)

  ❌ "Responsable du suivi comptable du projet."
  ✅ "Structuré le suivi budgétaire d'un projet financé par un bailleur
      international : production de 12 rapports financiers mensuels et
      automatisation de la paie, réduisant le temps de clôture de X à Y."

RÈGLE D'AFFICHAGE : timeline verticale, filtrable par pôle (dev/compta/infra).
```

---

## MODULE 8 — FORMATION & CERTIFICATIONS

```
Diplômes            : intitulé, établissement, année, mention
Certifications      : nom, organisme, date, date d'expiration, URL de vérification
Formations continues: nom, organisme, durée, année
Autoformation       : parcours, plateformes, projets d'application

RÈGLE : chaque certification affichée doit être vérifiable (lien ou identifiant).
        Aucune certification "en cours" affichée comme acquise.
        Section "En cours d'obtention" séparée et explicitement labellisée.
```

---

## MODULE 9 — SERVICES & OFFRES COMMERCIALES

Chaque service est présenté comme une **offre packagée**, pas comme une compétence.

```
Format imposé par service :
  · Nom de l'offre
  · Problème client résolu (en langage client, pas technique)
  · Livrables précis
  · Durée indicative
  · Fourchette tarifaire ou "Sur devis"
  · Pour qui (profil de client type)
  · Preuve (projet lié)
  · CTA : "Demander un devis" / "Réserver un échange de 30 min"

CATALOGUE :

  DÉVELOPPEMENT
   1. Application métier sur mesure (web / mobile)
   2. Conception et développement de produits SaaS
   3. ERP — Gestion commerciale & comptabilité SYSCOHADA
   4. SIH — Solutions pour établissements de santé
   5. Conception et intégration d'API
   6. Refonte, migration et modernisation d'applications existantes

  CONSEIL & ARCHITECTURE
   7. Architecture logicielle et cahier des charges technique
   8. Audit de code, de performance et de sécurité
   9. Consulting transformation digitale PME

  COMPTABILITÉ & GESTION
  10. Mise en place et tenue comptable SYSCOHADA
  11. Automatisation de la paie et du reporting financier
  12. Outils de pilotage et tableaux de bord de gestion
  13. Appui au reporting bailleurs / projets de développement

  INFRASTRUCTURE
  14. Audit, conception et déploiement d'infrastructure réseau
  15. Installation de systèmes de téléphonie IP et courants faibles
  16. Infogérance, maintenance et supervision
  17. DevOps : conteneurisation, CI/CD, sauvegarde, PRA

  FORMATION
  18. Formation développement web / outils bureautiques / logiciels métier
```

---

## MODULE 10 — TÉMOIGNAGES

```yaml
schema_temoignage:
  nom: ''
  fonction: ''
  entreprise: ''
  photo: ''
  logo: ''
  citation: '' # 40 à 70 mots, spécifique et non promotionnel
  note: 0 # sur 5
  projet_lie: ''
  date: ''
  autorisation: true # obligatoire avant publication
  source: 'linkedin | email | video | ecrit'
```

```
RÈGLE ABSOLUE : aucun témoignage fictif, même en placeholder visible.
Si la section est vide, elle N'EST PAS AFFICHÉE (feature flag `testimonials.enabled`).
Alternative provisoire recommandée : section "Ils m'ont fait confiance"
avec les logos des organisations pour lesquelles un travail réel a été effectué,
sous réserve d'autorisation.
```

---

## MODULE 11 — INDICATEURS & PREUVES

```
Compteurs animés en section Hero ou About (4 à 6 maximum) :

  · Années d'expérience cumulée
  · Projets livrés
  · Clients / organisations accompagnés
  · Technologies maîtrisées
  · Contributions GitHub (via API GitHub, en temps réel)
  · Lignes de code / commits (via API, optionnel)

RÈGLES :
  1. Chaque chiffre doit être défendable en entretien.
  2. Aucun chiffre arrondi à la hausse de façon flatteuse.
  3. Les données GitHub sont récupérées dynamiquement (pas en dur),
     avec cache ISR de 24 h et fallback en cas d'échec de l'API.
  4. Animation de comptage déclenchée à l'entrée dans le viewport,
     désactivée si `prefers-reduced-motion`.
```

---

## MODULE 12 — DESIGN SYSTEM

```
DIRECTION ARTISTIQUE

  Positionnement visuel : "Enterprise Technical Elegance"
  → Sobre, dense en information, typographique, crédible.
  → NI startup fluo, NI template Bootstrap, NI portfolio de graphiste.
  → Référence de ton : documentation Stripe, Linear, Vercel —
    avec une signature chromatique propre au contexte ouest-africain.

PALETTE

  Fondations neutres  : échelle de gris 50→950 (base de 90 % de l'interface)
  Couleur primaire    : [À DÉFINIR] — usage strictement réservé aux actions
  Accents par pôle    : 3 teintes distinctes, une par domaine d'expertise
                        (dev / compta / infra) — utilisées pour le filtrage,
                        les badges et le diagramme de Venn
  Sémantique          : succès, alerte, erreur, information
  Contraste           : WCAG AA minimum (4.5:1 texte, 3:1 UI), AAA visé sur le corps de texte

TYPOGRAPHIE

  Titres     : sans-serif géométrique à fort caractère (ex. Satoshi, Cabinet Grotesk)
  Corps      : sans-serif haute lisibilité (ex. Inter, Geist)
  Monospace  : code et données chiffrées (ex. JetBrains Mono, Geist Mono)
  Échelle    : modulaire ratio 1.25 · fluide via clamp() · max 2 familles + 1 mono
  Chargement : next/font, subset latin + latin-ext, display: swap, aucun FOUT

SYSTÈME

  Espacement        : échelle de 4 px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)
  Rayons            : 4 / 8 / 12 / 16 / full
  Élévation         : 5 niveaux d'ombres, subtiles, cohérentes en dark mode
  Grille            : 12 colonnes, max-width 1280 px, gouttières fluides
  Bordures          : 1 px, couleur dérivée de l'échelle neutre (jamais de noir pur)

THÈMES

  Dark mode par défaut (attente de la cible technique), light mode complet,
  bascule persistée (cookie + prefers-color-scheme), aucun flash au chargement.

EFFETS — usage parcimonieux et justifié

  Glassmorphism : autorisé UNIQUEMENT sur la navigation flottante et les modales.
  Dégradés      : bordures et lueurs subtiles, jamais de fond plein saturé.
  Grain/bruit   : léger, sur les sections héroïques, pour la profondeur.
  Neumorphism   : INTERDIT (contraste insuffisant, accessibilité dégradée).

MOUVEMENT

  Bibliothèque   : Framer Motion (interface) + GSAP/ScrollTrigger (séquences narratives)
  Durées         : 150 ms (micro) / 300 ms (transition) / 600 ms (entrée de section)
  Easing         : cubic-bezier(0.16, 1, 0.3, 1) par défaut
  Principes      : l'animation informe (hiérarchie, causalité), elle ne décore pas.
  Accessibilité  : `prefers-reduced-motion` désactive TOUTE animation non essentielle.
  Performance    : uniquement `transform` et `opacity`, jamais de layout thrashing.

ICONOGRAPHIE & ILLUSTRATION

  Icônes        : Lucide React, trait 1.5 px, jeu unique, aucun mélange de styles.
  Illustration  : diagrammes d'architecture originaux (Mermaid → SVG optimisé),
                  motifs géométriques abstraits. AUCUNE illustration générique
                  de banque d'images.
  Photographie  : un portrait professionnel unique, traité de façon cohérente.
```

---

## MODULE 13 — UX / UI : ARCHITECTURE DES SECTIONS

Pour **chaque** section, l'IA produit : objectif · contenu · disposition · animations · interactions · comportement responsive · état vide · état de chargement.

```
 1. NAVIGATION
    Barre flottante, condensation au scroll, indicateur de section active,
    bascule de thème, sélecteur de langue, CTA "Me contacter" persistant.
    Mobile : menu plein écran, navigation au pouce.

 2. HERO
    Objectif : établir le positionnement tri-expertise en < 8 secondes.
    Contenu  : nom · titre · proposition de valeur (1 phrase) ·
               3 badges de pôles · 2 CTA (Voir les projets / Télécharger le CV) ·
               indicateur de disponibilité.
    Interdit : effet de machine à écrire, particules animées, fond vidéo.

 3. TRIPLE EXPERTISE
    Le diagramme de Venn interactif du MODULE 4. Section signature du site.
    Au survol/clic d'une intersection : révélation des projets correspondants.

 4. À PROPOS
    Récit (MODULE 3), portrait, valeurs, compteurs (MODULE 11).

 5. COMPÉTENCES
    Onglets par pôle. Chaque compétence : niveau nommé + preuve cliquable
    renvoyant au projet qui l'atteste. Recherche instantanée.

 6. PROJETS
    Grille filtrable (pôle, technologie, type, statut) + tri.
    Carte : visuel, titre, accroche, badges de pôle, stack, statut.
    Page dédiée pour chaque projet phare (MODULE 6.1).
    État vide : message explicite si aucun résultat de filtre.

 7. SERVICES
    Grille d'offres packagées (MODULE 9), groupées par famille,
    chacune avec livrables, durée, tarif et CTA de devis.

 8. EXPÉRIENCE
    Timeline verticale, filtrable par pôle, avec logos et résultats chiffrés.

 9. FORMATION & CERTIFICATIONS
    Grille de cartes avec liens de vérification.

10. TÉMOIGNAGES
    Carrousel accessible (navigation clavier, pause, ARIA live).
    Section masquée si vide.

11. BLOG / NOTES TECHNIQUES
    Liste d'articles MDX, filtrable par thème, temps de lecture,
    sommaire flottant, coloration syntaxique, articles liés.

12. FAQ
    Accordéon accessible. 8 à 12 questions réelles :
    tarification, délais, méthode de travail, propriété du code,
    maintenance, travail à distance, facturation internationale, NDA.

13. CONTACT
    Formulaire (nom, email, organisation, type de projet, budget, message)
    avec validation Zod côté client ET serveur, protection anti-spam,
    accusé de réception automatique.
    Coordonnées directes, liens sociaux, réservation de créneau.

14. FOOTER
    Plan du site, mentions légales, politique de confidentialité,
    informations légales (NINEA/RCCM), langue, thème, retour en haut.
```

```
PARCOURS UTILISATEURS À OPTIMISER (à traiter explicitement) :

  Parcours A — Recruteur  : Hero → Compétences → Expérience → CV → Contact
  Parcours B — Client PME : Hero → Services → Projets → FAQ → Devis
  Parcours C — Pair tech  : Hero → Projets → Architecture → GitHub → Blog

  Chaque parcours doit être réalisable en 4 clics maximum depuis l'arrivée.
```

---

## MODULE 14 — SEO, PERFORMANCE & ACCESSIBILITÉ

```
SEO TECHNIQUE

  · Métadonnées dynamiques par route (Metadata API de Next.js)
  · Schema.org : Person, ProfessionalService, WebSite, BreadcrumbList,
    SoftwareApplication (par projet), Article (par publication), FAQPage
  · Open Graph + Twitter Card, images OG générées dynamiquement (@vercel/og)
  · sitemap.xml et robots.txt générés automatiquement
  · URL canoniques, balises hreflang (fr / en)
  · Fil d'Ariane sur toutes les pages profondes
  · Flux RSS pour le blog

SEO SÉMANTIQUE

  · Un seul <h1> par page, hiérarchie de titres stricte et continue
  · Mots-clés cibles à couvrir :
      "développeur full stack Sénégal", "développeur web Dakar",
      "ERP SYSCOHADA", "logiciel de gestion PME Sénégal",
      "développeur React Node Afrique", "SIH Sénégal",
      "technicien comptable Dakar", "audit informatique Sénégal"
  · Contenu long-forme sur les pages projets (≥ 800 mots utiles)
  · Maillage interne systématique projets ↔ compétences ↔ services ↔ blog

PERFORMANCE — budgets contraignants

  · LCP < 2,0 s · INP < 200 ms · CLS < 0,1 · TTFB < 600 ms
  · Bundle JS initial < 150 kB (gzip)
  · Images : next/image, AVIF/WebP, dimensions explicites, lazy loading
  · Fonts : auto-hébergées via next/font, préchargées, subsettées
  · Rendu : Server Components par défaut, `use client` uniquement si nécessaire
  · ISR pour les contenus dynamiques, SSG pour le contenu statique
  · CONTRAINTE MARCHÉ : le site doit rester utilisable en 3G.
    Tester explicitement en profil "Slow 3G" et documenter le résultat.

ACCESSIBILITÉ — WCAG 2.1 niveau AA minimum

  · HTML sémantique, points de repère ARIA, ordre de titres cohérent
  · Navigation complète au clavier, focus visible, lien d'évitement
  · Contraste vérifié sur les deux thèmes
  · Textes alternatifs pertinents sur toutes les images
  · Formulaires : labels associés, messages d'erreur liés, ARIA live
  · Respect de prefers-reduced-motion et prefers-contrast
  · Validation : axe DevTools + test lecteur d'écran (NVDA/VoiceOver)

OBJECTIF LIGHTHOUSE : 100 / 100 / 100 / 100 — vérifié en CI, bloquant au merge.
```

---

## MODULE 15 — FONCTIONNALITÉS

```
V1 — INDISPENSABLE
  · Dark / Light mode persisté
  · Internationalisation FR / EN (next-intl, routing localisé)
  · Téléchargement du CV en PDF (versions FR et EN, une par pôle si pertinent)
  · Filtrage et recherche de projets
  · Formulaire de contact avec validation et notification
  · Analytics respectueux de la vie privée (Plausible / Umami)
  · Blog MDX
  · Feature flags pour masquer les sections non encore alimentées

V2 — DIFFÉRENCIANT
  · Recherche globale (⌘K / Ctrl+K) — pages, projets, articles, compétences
  · Statistiques GitHub en temps réel
  · Générateur de CV dynamique : le visiteur sélectionne un pôle
    (dev / compta / infra) et télécharge un CV ciblé généré à la volée
  · Assistant IA de portfolio : répond aux questions des recruteurs
    sur le parcours, à partir d'un contexte strictement borné au contenu
    du site (aucune extrapolation, réponse "je ne sais pas" assumée)
  · Simulateur de devis pour les services
  · Newsletter

V3 — PLATEFORME
  · Tableau de bord d'administration (gestion du contenu sans redéploiement)
  · API publique documentée (OpenAPI)
  · Application mobile React Native
  · Espace client (suivi de mission, livrables, facturation)
```

---

## MODULE 16 — STACK TECHNIQUE & ARCHITECTURE

### 16.1 Stack imposée

```
Frontend      : Next.js 15 (App Router) · React · TypeScript strict · TailwindCSS
Animation     : Framer Motion · GSAP (ScrollTrigger)
État/données  : TanStack Query · Zustand
Contenu       : MDX (Contentlayer ou next-mdx-remote)
Backend       : NestJS (API) · REST + OpenAPI
Base de données: PostgreSQL · Prisma
Cache/Queue   : Redis · BullMQ
Validation    : Zod (schémas partagés client/serveur)
Auth          : NextAuth / JWT + RBAC (pour l'admin)
Tests         : Vitest · Testing Library · Playwright
Qualité       : ESLint · Prettier · Husky · lint-staged · Commitlint · Changesets
Monorepo      : pnpm workspaces · Turborepo
Conteneurs    : Docker · Docker Compose · Nginx
CI/CD         : GitHub Actions
Hébergement   : Vercel (web) · [Railway/Fly.io/VPS] (API) · Cloudflare (DNS/CDN)
Médias        : Cloudinary ou stockage S3-compatible
Monitoring    : Sentry · Plausible/Umami · Better Stack (uptime)
```

### 16.2 Architecture monorepo imposée

```text
portfolio-enterprise/
│
├── apps/
│   ├── web/                    # Portfolio public (Next.js)
│   ├── admin/                  # Tableau de bord de gestion de contenu
│   ├── api/                    # API Backend (NestJS)
│   ├── mobile/                 # Application mobile (React Native) — V3
│   └── desktop/                # Electron — optionnel
│
├── packages/
│   ├── ui/                     # Design System partagé (tokens + primitives)
│   ├── components/             # Composants métier réutilisables
│   ├── hooks/
│   ├── utils/                  # dont formatFCFA(), formatDateSN()
│   ├── config/
│   ├── types/
│   ├── constants/
│   ├── services/
│   ├── validations/            # schémas Zod partagés
│   ├── auth/
│   ├── analytics/
│   ├── i18n/
│   └── eslint-config/
│
├── content/
│   ├── about/  skills/  projects/  experience/  education/
│   ├── certifications/  testimonials/  services/  blog/  faq/
│
├── docs/
│   ├── 00-MasterPrompt/        # ce document
│   ├── 01-Business/            # Vision.md · Objectifs.md · PersonalBrand.md · Positionnement.md
│   ├── 02-Architecture/        03-DesignSystem/     04-UX/
│   ├── 05-UI/                  06-SEO/              07-Content/
│   ├── 08-Projets/             09-Experience/       10-Blog/
│   ├── 11-Analytics/           12-DevOps/           13-Security/
│   ├── 14-Deployment/          15-Roadmap/
│   └── assets/  screenshots/
│
├── prompts/
│   ├── MasterPrompt.md
│   ├── UI/  UX/  SEO/  Blog/  Projects/  CV/
│   ├── Recruiters/  Images/  Animations/  Deployment/
│
├── database/     prisma/  migrations/  seed/
├── docker/       development/  production/  nginx/  compose/
├── infra/        github/  vercel/  cloudflare/  monitoring/  logging/  backup/
├── scripts/      setup/  build/  deploy/  backup/  lint/  test/
├── tests/        unit/  integration/  e2e/  performance/
├── assets/       avatar/  logos/  icons/  certificates/  screenshots/
│                 videos/  cv/  presentations/  social/
│
├── .github/workflows/   .vscode/   .husky/   .changeset/   public/
├── package.json  pnpm-workspace.yaml  turbo.json  docker-compose.yml
└── README.md  LICENSE
```

### 16.3 Règle de démarrage progressif

```
Ne PAS créer l'intégralité du monorepo dès le premier jour.

  Étape 1 : apps/web + packages/ui + packages/utils + content/ + docs/
  Étape 2 : ajout de packages/i18n, packages/analytics, tests/
  Étape 3 : ajout de apps/api + database/ (quand le CMS devient nécessaire)
  Étape 4 : ajout de apps/admin, puis apps/mobile

Le squelette de dossiers est prévu dès le départ ; le code arrive par vagues.
Un monorepo vide à 90 % est un signal négatif en revue de dépôt.
```

---

## MODULE 17 — RÈGLES DE QUALITÉ (NON NÉGOCIABLES)

```
CODE
  1.  TypeScript en mode strict. Zéro `any`, zéro `@ts-ignore`.
  2.  Composants < 200 lignes. Au-delà : décomposition obligatoire.
  3.  Une responsabilité par fichier, nommage explicite en anglais pour le code,
      contenu et commentaires métier en français.
  4.  Aucune valeur en dur : tout passe par tokens, constantes ou contenu.
  5.  Server Components par défaut ; `use client` justifié par un commentaire.
  6.  Gestion d'erreur systématique : error.tsx, loading.tsx, not-found.tsx.
  7.  Aucune dépendance ajoutée sans justification écrite dans docs/02-Architecture.

TESTS
  8.  Couverture ≥ 80 % sur la logique métier (utils, services, validations).
  9.  Tests E2E Playwright sur les 3 parcours utilisateurs du MODULE 13.
  10. Test d'accessibilité automatisé (axe) intégré à la CI.

GIT & LIVRAISON
  11. Conventional Commits. Branches par fonctionnalité. Aucun commit direct sur main.
  12. CI bloquante : lint + types + tests + build + Lighthouse.
  13. Chaque PR décrit : quoi, pourquoi, comment tester, captures avant/après.

DOCUMENTATION
  14. README exécutable : un développeur tiers lance le projet en < 5 minutes.
  15. Chaque décision d'architecture consignée en ADR (docs/02-Architecture/adr/).
  16. Le code est écrit pour être relu par un recruteur technique. Le dépôt
      GitHub EST une pièce du portfolio : il est traité avec le même soin.

SÉCURITÉ & CONFORMITÉ
  17. Aucun secret en dur ; variables d'environnement validées au démarrage (Zod).
  18. En-têtes de sécurité (CSP, HSTS, X-Frame-Options) configurés.
  19. Limitation de débit sur le formulaire de contact et l'API.
  20. Bannière de consentement si analytics avec cookies ; privilégier le sans-cookie.
  21. Mentions légales et politique de confidentialité conformes à la
      Loi sénégalaise 2008-12 et au RGPD (visiteurs européens).
```

---

## MODULE 18 — LIVRABLES ATTENDUS

```
 1. Document de positionnement et de marque personnelle (docs/01-Business)
 2. Architecture technique complète + ADR + diagrammes
 3. Arborescence du monorepo initialisée et fonctionnelle
 4. Wireframes basse fidélité de toutes les sections (desktop + mobile)
 5. Design System documenté : tokens, primitives, états, exemples
 6. Maquettes haute fidélité des sections clés
 7. Contenu rédactionnel intégral en français (puis traduction anglaise)
 8. Code source complet, typé, testé, commenté
 9. Bibliothèque de composants réutilisables documentée
10. Fiches projets rédigées (minimum 3 complètes)
11. CV PDF — versions FR/EN, générées depuis les données du site
12. Configuration SEO complète + images OG
13. Suite de tests (unitaires, intégration, E2E, accessibilité)
14. Pipeline CI/CD opérationnel
15. Configuration Docker (dev et prod)
16. Documentation de déploiement et de reprise
17. Plan de maintenance et calendrier de mise à jour du contenu
18. Feuille de route V2 / V3 priorisée
```

---

## MODULE 19 — PROTOCOLE D'EXÉCUTION

### 19.1 Séquencement imposé

```
PHASE 0 — VISION & CADRAGE
  Sortie : docs/01-Business complet, positionnement validé, différenciateurs arrêtés.
  Validation humaine OBLIGATOIRE avant la phase suivante.

PHASE 1 — BRANDING & DESIGN SYSTEM
  Sortie : palette, typographie, tokens, composants primitifs, thèmes.

PHASE 2 — ARCHITECTURE & FONDATIONS
  Sortie : monorepo initialisé, CI en place, layout, navigation, i18n, thèmes.

PHASE 3 — CONTENU
  Sortie : tout le contenu rédigé et structuré en MDX/JSON. AVANT le développement
  des sections — le contenu dicte la forme, jamais l'inverse.

PHASE 4 — DÉVELOPPEMENT DES SECTIONS
  Ordre : Hero → Triple Expertise → Projets → Services → À propos →
          Compétences → Expérience → Formation → FAQ → Contact → Footer.
  Une section = une PR = un incrément déployable et testé.

PHASE 5 — SEO & PERFORMANCE
PHASE 6 — ACCESSIBILITÉ & TESTS
PHASE 7 — DÉPLOIEMENT & MONITORING
PHASE 8 — BLOG
PHASE 9 — TABLEAU DE BORD ADMIN
PHASE 10 — MOBILE & FONCTIONNALITÉS IA
```

### 19.2 Commandes d'activation

```
Pour piloter la génération, utiliser ces instructions :

  EXÉCUTER MODULE <n>          → traiter un module en profondeur
  GÉNÉRER SECTION <nom>        → produire une section complète (design + code + contenu)
  GÉNÉRER FICHE PROJET <slug>  → produire la documentation complète d'un projet
  RÉDIGER <type de contenu>    → produire du contenu éditorial
  AUDITER <cible>              → revue critique (code, SEO, a11y, perf, contenu)
  ITÉRER <élément>             → amélioration ciblée avec justification
  RÉCAPITULER                  → état d'avancement vs MODULE 18
```

### 19.3 Format de réponse attendu de l'IA

```
Pour chaque livraison :

  1. RAPPEL DU PÉRIMÈTRE      — ce qui est traité, ce qui ne l'est pas
  2. QUESTIONS BLOQUANTES     — s'il en existe, poser AVANT de produire
  3. DÉCISIONS PRISES         — choix + justification + alternative écartée
  4. LIVRABLE                 — code / contenu / document, complet et exécutable
  5. VÉRIFICATIONS            — comment tester et valider
  6. PROCHAINE ÉTAPE          — une seule action suivante recommandée
```

---

## ANNEXE A — VARIABLES À COMPLÉTER AVANT LE LANCEMENT

```
[ ] Nom complet et titre professionnel définitif
[ ] Slogan / proposition de valeur en une phrase
[ ] Coordonnées complètes et liens (LinkedIn, GitHub, domaine)
[ ] Portrait professionnel haute résolution
[ ] Nom de domaine acquis
[ ] Récit personnel : les 8 points du MODULE 3
[ ] Liste définitive des projets à présenter + niveau de confidentialité de chacun
[ ] Captures d'écran et démonstrations vidéo des projets
[ ] Historique complet des expériences avec résultats chiffrés
[ ] Diplômes et certifications avec liens de vérification
[ ] Grille tarifaire ou politique de tarification par service
[ ] Témoignages sollicités et autorisations obtenues
[ ] Statistiques réelles à afficher (MODULE 11)
[ ] Informations légales (NINEA, RCCM) pour le footer
[ ] Choix de la couleur primaire et des 3 accents de pôle
```

## ANNEXE B — ANTI-PATTERNS PROSCRITS

```
✗ Barres de progression en pourcentage sur les compétences
✗ Effet machine à écrire dans le Hero
✗ Fond de particules ou d'animation lourde
✗ Témoignages fictifs ou génériques
✗ Illustrations de banque d'images non spécifiques
✗ "Passionné de technologie depuis toujours" et autres formules creuses
✗ Sections vides affichées avec du contenu factice
✗ Scroll détourné (scrolljacking) ou navigation non standard
✗ Curseur personnalisé
✗ Musique ou son automatique
✗ Chiffres non défendables en entretien
✗ Dépôt GitHub négligé alors qu'il est mis en avant
```

---

**FIN DU MASTER PROMPT v1.0**

> Ce document est versionné. Toute évolution majeure du positionnement,
> de la stack ou du périmètre donne lieu à une nouvelle version (v1.1, v2.0)
> consignée dans `docs/00-MasterPrompt/CHANGELOG.md`.
