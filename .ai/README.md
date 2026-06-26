# .ai — AI Website Framework

Ein agentisches Framework für die Entwicklung professioneller Websites mit diesem Astro-Template.

Kein Prompt-Ordner. Ein vollständiges Arbeitssystem für dieses Repository.

---

## Einstieg

Beginne mit dem passenden Orchestrator:

- `website-generator.md` für neue Websites.
- `website-update.md` für Redesigns, Relaunches, Migrationen und Optimierungen bestehender Websites.

Verbindliche Quellen in dieser Reihenfolge:

1. Projektregeln: `CLAUDE.md`
2. Tatsächliche Scripts und Versionen: `package.json`, `pnpm-workspace.yaml`, App-Configs
3. Workflow: `.ai/website-generator.md` oder `.ai/website-update.md`
4. Detailwissen: `.ai/knowledge/*.md`

Wenn sich `.ai` und Projektdateien widersprechen, gelten die Projektdateien.

Arbeite dann die Phasen in Reihenfolge durch:

```
website-generator.md                          ← Neue Website
website-update.md                             ← Bestehende Website überarbeiten
│
├── prompts/phases/01-project-init.md         Phase 1: Verstehen
├── prompts/phases/02-creative-direction.md   Phase 2: Creative Direction
├── prompts/phases/03-website-architecture.md Phase 3: Architektur
├── prompts/phases/04-implementation.md       Phase 4: Code
├── prompts/phases/05-assets.md               Phase 5: Bilder & Assets
└── prompts/phases/06-quality-review.md       Phase 6: Review & Freigabe
```

---

## Struktur

`prompts/phases/` = **Projektphasen** (Zeitachse, wann wird was getan).  
`prompts/01-09` = **Handwerk-Prompts** (inhaltliche Tiefe pro Thema, bei Bedarf abrufen).  
Jede Phase-Datei verweist auf die zugehörigen Handwerk-Prompts.

```
.ai/
├── website-generator.md       Orchestrator, Rollen, Workflow
├── website-update.md          Orchestrator für Redesign, Relaunch, Migration
│
├── prompts/                   Rollen & Arbeitsanweisungen
│   ├── 01-role.md             Rollendefinitionen & Perspektiven
│   ├── 02-interview.md        Projekt-Interview & Gesprächsführung
│   ├── 03-branding.md         Brand Strategy Deep Dive
│   ├── 04-copywriting.md      Copywriting & Textstrategie
│   ├── 05-images.md           Bildstrategie & KI-Bilder
│   ├── 06-layout.md           UX, Layout & Informationsarchitektur
│   ├── 07-components.md       Komponentenbibliothek & Implementierung
│   ├── 08-quality.md          Quality Gates & Scoring
│   ├── 09-reflection.md       Reflection Loop & Red Team
│   │
│   └── phases/                Die 6 Arbeitsphasen (Einstiegspunkte)
│       ├── 01-project-init.md     Interview, Zielgruppe, Wettbewerber
│       ├── 02-creative-direction.md Brand, Farben, Typografie, Motion
│       ├── 03-website-architecture.md IA, Komponenten, SEO, Tokens
│       ├── 04-implementation.md   Code, Astro v7, TypeScript, a11y
│       ├── 05-assets.md           Bildstrategie, KI-Bilder
│       └── 06-quality-review.md   Review, Red Team, Quality Gates
│
├── examples/                  Vollständige Projektdefinitionen
│   ├── saas.yaml              SaaS-Produkt mit Trial-Funnel
│   ├── local-business.yaml    Lokales Handwerksunternehmen
│   ├── ecommerce.yaml         D2C / Shop-Marke
│   └── blog.yaml              Developer Blog / Personal Brand
│
└── knowledge/                 Interne Wissensbasis
    ├── astro.md               Astro v7 Breaking Changes, Patterns
    ├── tailwind.md            Tailwind v4 CSS-first, OKLCH, Tokens
    ├── accessibility.md       WCAG 2.2 AA, ARIA, Testing
    ├── seo.md                 Meta-Tags, JSON-LD, Core Web Vitals
    ├── performance.md         Budget, Images, Fonts, CLS
    ├── nano-banana.md         KI-Bildgenerierung, Prompt-Templates
    ├── copywriting.md         Textstrategie, Formulare, Tonalität
    └── conversion.md          CTA, Social Proof, Formulare, Psychologie
```

---

## Das Team

```
Creative Director
│
├── Brand Strategist          Positionierung, Differenzierung
├── UX Lead                   Nutzerführung, IA
├── UI Designer               Farben, Typografie, Tokens
├── Conversion Specialist     CTAs, Formulare, Psychologie
├── SEO Specialist            Struktur, Metadaten, JSON-LD
├── Accessibility & Performance Engineer  WCAG, Lighthouse
├── Senior Astro Architect    Komponenten, Actions, i18n
├── Senior Frontend Engineer  TypeScript, Tailwind, Svelte
├── Copywriter                Texte, Headlines, CTAs
└── Visual AI Director        KI-Bilder, Bildstrategie
```

---

## Arbeitsprinzipien

- Ändere zuerst bestehende Dateien; lege neue Dateien nur an, wenn die Architektur sie verlangt.
- Halte dich an die Monorepo-Grenzen: Apps importieren nur aus `@astro-v7/shared`, niemals aus anderen Apps.
- Nutze die vorhandenen Scripts: `pnpm check`, `pnpm type-check`, `pnpm build`, gezielte `pnpm test:e2e:*`.
- Nutze `@lucide/svelte` für Icons und keine neuen Icon- oder UI-Bibliotheken ohne Grund.
- Verwende `@casoon/astro-site-files` für Sitemap, Robots und Site-Metadateien.
- Prüfe reale Dateien, bevor du Astro-, Tailwind-, i18n- oder SEO-Patterns übernimmst.

---

## Qualitätsgates

Kein Projekt verlässt das Framework ohne:

| Gate | Kriterium |
|------|-----------|
| Strategie | Zielgruppe als Person beschrieben, CTA definiert |
| Creative | OKLCH-Farbsystem, Typografie-Skala, Tonalität |
| Architektur | Alle Seiten mit Zweck und CTA dokumentiert |
| Code | TypeScript strict, `pnpm check` clean, kein neues `any` |
| Accessibility | WCAG 2.2 AA, axe-core 0 Violations, Keyboard-Navigation |
| Performance | Lighthouse Performance 90+, A11y/SEO 100, stabile Core Web Vitals |
| SEO | Title, Description, OG, JSON-LD auf jeder Seite |

---

## Aktualisierung

- `knowledge/` — Einzelne Dateien unabhängig aktualisieren
- `prompts/` — Phasen anpassen ohne Orchestrator zu ändern
- `examples/` — Neue Projekttypen als YAML ergänzen
- `website-generator.md` — Nur ändern wenn sich der Workflow ändert
