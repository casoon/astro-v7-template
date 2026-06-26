# Phase 3 — Website-Architektur

**Rolle:** Senior Astro Architect + UX Lead + SEO Specialist  
**Referenz:** `knowledge/astro.md`, `knowledge/seo.md`, `knowledge/accessibility.md`  
**Input:** Creative Direction aus Phase 2

---

## Informationsarchitektur

### Seitenstruktur

Definiere jede Seite vollständig:

```yaml
seiten:
  - route: "/"
    titel: ""
    meta_description: ""
    primaerer_cta: ""
    ziel: ""
    zielgruppe_segment: ""
    seo_keywords: []
    inhalt:
      - abschnitt: "Hero"
        komponenten: []
        conversion_ziel: ""
      - abschnitt: "..."
        komponenten: []
        conversion_ziel: ""

  - route: "/contact/"
    # ...

  - route: "/[weitere-seiten]"
    # ...
```

### Navigationsstruktur

```
Primär-Navigation:
  - [Seitenname] → [Route]
  - [Seitenname] → [Route]
  - CTA: [Text] → [Route]

Footer:
  Spalte 1 (Marke):
    - Logo
    - Kurzbeschreibung
    - Social Links
  
  Spalte 2 (Navigation):
    - [Links]
  
  Spalte 3 (Rechtliches):
    - Impressum
    - Datenschutz
    - [weitere]
```

### Nutzerpfade

Definiere die 3 wichtigsten Pfade:

```
Pfad 1: [Typ, z.B. "Direkter Käufer"]
  Startpunkt → [Seite] → [Seite] → Conversion

Pfad 2: [Typ, z.B. "Skeptischer Rechercheur"]
  Startpunkt → [Seite] → [Seite] → [Seite] → Conversion

Pfad 3: [Typ, z.B. "Empfehlungsempfänger"]
  Startpunkt → [Seite] → Conversion
```

---

## Astro v7 Projektstruktur

Dieses Repository ist ein Monorepo. Plane Änderungen immer entlang dieser Grenzen:

- `apps/starter/`: Landing Page, Kontaktformular, i18n.
- `apps/blog/`: MDX Blog, Content Collections, RSS, OG-Bilder.
- `shared/`: Design Tokens, globale Styles, Layouts, UI-Komponenten, SEO-Utilities.
- Apps importieren aus `@astro-v7/shared`; Apps importieren nicht gegenseitig.
- Gemeinsame Komponenten und Tokens gehören nach `shared/`, app-spezifische Seiten und Actions bleiben in der App.

```
apps/[starter|blog]/src/
├── actions/
│   ├── index.ts              # Re-export hub
│   └── contact.ts            # Kontaktformular Action
│
├── components/
│   ├── ui/                   # Primitive UI-Komponenten
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   └── Badge.astro
│   ├── sections/             # Seitenabschnitte
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Testimonials.astro
│   │   └── CTA.astro
│   ├── layout/               # Layout-Elemente
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── ThemeToggle.svelte
│   └── seo/
│       └── PageSEO.astro
│
├── content/                  # [nur blog template]
│   └── posts/
│       └── example.mdx
│
├── content.config.ts         # [nur blog template]
│
├── i18n/
│   ├── en.ts
│   ├── de.ts
│   └── index.ts
│
├── layouts/
│   ├── Base.astro
│   └── Page.astro
│
├── pages/
│   ├── index.astro
│   ├── contact.astro
│   ├── privacy.astro
│   ├── legal.astro
│   └── de/
│       ├── index.astro
│       └── contact.astro
│
└── styles/
    ├── global.css
    └── tokens.css

shared/src/
├── components/
├── layouts/
├── styles/
└── utils/
```

---

## Komponenten-Planung

Für jede Komponente:

```yaml
komponente: "Hero"
datei: "src/components/sections/Hero.astro"
props:
  - name: "headline"
    typ: "string"
    required: true
  - name: "subline"
    typ: "string"
    required: false
  - name: "ctaText"
    typ: "string"
    required: true
  - name: "ctaHref"
    typ: "string"
    required: true
varianten: []
accessibility:
  - landmark: "main oder header"
  - heading: "h1, einmalig pro Seite"
  - cta: "beschreibender Link-Text"
seo:
  - "H1 enthält primäres Keyword"
  - "Subline unterstützt Snippet"
```

---

## Design Token System

Token-Dateien: `shared/src/styles/variables.css` und `shared/src/styles/theme.css`.

Drei Token-Ebenen:

```css
/* Ebene 1: Primitive (rohe Werte) */
:root {
  --primitive-blue-500: oklch(0.55 0.18 250);
  --primitive-neutral-900: oklch(0.15 0.01 250);
  /* ... */
}

/* Ebene 2: Semantische Tokens (Bedeutung) */
:root {
  --color-brand-primary: var(--primitive-blue-500);
  --color-text-default: var(--primitive-neutral-900);
  --color-bg-surface: var(--primitive-neutral-50);
  /* ... */
}

/* Ebene 3: Komponenten-Tokens (spezifisch) */
:root {
  --button-primary-bg: var(--color-brand-primary);
  --button-primary-text: white;
  --navbar-bg: var(--color-bg-surface);
  /* ... */
}

/* Dark Mode */
.dark {
  --color-text-default: var(--primitive-neutral-50);
  --color-bg-surface: var(--primitive-neutral-900);
  /* ... */
}
```

---

## SEO-Architektur

Referenz: `knowledge/seo.md`

### Metadaten-Matrix

| Seite | Title | Description | OG Image | JSON-LD |
|-------|-------|-------------|----------|---------|
| / | max 60 Zeichen | max 160 Zeichen | og-home.png | Organization |
| /contact/ | ... | ... | og-contact.png | ContactPage |
| /blog/[slug] | ... | ... | og-[slug].png | Article |

### JSON-LD Schemas

Definiere welche Schemas auf welchen Seiten:

```
/ (Startseite):
  - Organization
  - WebSite (für Sitelinks-Searchbox)

/contact/:
  - LocalBusiness (wenn lokal)
  - ContactPage

/blog/[slug]:
  - Article
  - BreadcrumbList

Alle Seiten:
  - BreadcrumbList
```

### URL-Struktur

```
Englisch (Standard): /
Deutsch:             /de/

Regeln:
- Trailing Slashes konsistent nutzen (`trailingSlash: 'always'`)
- Lowercase, Bindestriche statt Unterstriche
- Sprechende URLs (keine IDs, keine Abkürzungen)
- Canonical Tags auf jeder Seite
```

---

## i18n-Architektur

```typescript
// src/i18n/index.ts

export const defaultLocale = 'en';
export const locales = ['en', 'de'] as const;
export type Locale = typeof locales[number];

// Astro Config:
// i18n: {
//   defaultLocale: 'en',
//   locales: ['en', 'de'],
//   routing: { prefixDefaultLocale: false },
// }
```

Übersetzungsstruktur:

```typescript
// src/i18n/de.ts
export const de = {
  nav: {
    home: 'Start',
    contact: 'Kontakt',
  },
  hero: {
    headline: '',
    subline: '',
    cta: '',
  },
  // ... alle Strings
} as const;
```

---

## Accessibility-Architektur

Referenz: `knowledge/accessibility.md`

### Landmark-Struktur (jede Seite)

```html
<header>            <!-- site-wide navigation -->
  <nav>             <!-- primary navigation -->
<main>              <!-- page content -->
  <section>         <!-- named sections (aria-label) -->
<footer>            <!-- site footer -->
```

### Skip Navigation

```astro
<!-- Erstes Element im body, immer -->
<a href="#main-content" class="skip-link">
  Zum Hauptinhalt springen
</a>
```

### Fokus-Management

- Sichtbare Focus-Styles auf allen interaktiven Elementen
- Focus Trap in Modals und Drawers
- Focus Management bei Routenwechseln (ClientRouter)

---

## Performance-Budget

Referenz: `knowledge/performance.md`

```yaml
performance_budget:
  lighthouse:
    performance: 90
    accessibility: 100
    best_practices: 95
    seo: 100
  
  core_web_vitals:
    lcp: "< 2.5s"
    fid: "< 100ms"
    cls: "< 0.1"
    inp: "< 200ms"
  
  bundle:
    initial_js: "< 50kb gzipped"
    initial_css: "< 20kb gzipped"
  
  bilder:
    format: "WebP + AVIF"
    lazy_loading: true
    srcset: true
```

---

## Reflection Loop

**Prüfung 1: Nutzerpfade**
Führe den wichtigsten Pfad gedanklich durch. An welchem Punkt würde ein echter Nutzer abbrechen?

**Prüfung 2: SEO-Vollständigkeit**
Hat jede Seite einen einzigartigen Title, eine einzigartige Description und JSON-LD?

**Prüfung 3: Accessibility**
Kann man die Website ausschließlich mit der Tastatur bedienen? An welchem Punkt versagt das?

**Prüfung 4: Mobildarstellung**
Wie sieht die Navigation auf 375px Breite aus? Gibt es Overflow-Probleme?

---

## Output dieser Phase

```yaml
architektur:
  seiten: []
  komponenten: []
  token_system: definiert
  seo:
    metadaten_matrix: []
    json_ld_schemas: []
  i18n:
    default_locale: ""
    locales: []
  performance_budget: {}
  
  naechster_schritt: "→ Phase 4: Implementierung"
```
