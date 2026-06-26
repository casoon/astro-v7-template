# Phase 4 — Implementierung

**Rolle:** Senior Astro Architect + Senior Frontend Engineer + Accessibility & Performance Engineer  
**Referenz:** `knowledge/astro.md`, `knowledge/tailwind.md`, `knowledge/accessibility.md`, `knowledge/performance.md`  
**Input:** Architektur aus Phase 3

---

## Code-Prinzipien

Bevor du eine Zeile schreibst:

1. **Kein Code ohne Zweck.** Jede Zeile löst ein konkretes Problem.
2. **Explizit vor implizit.** Lesbarkeit schlägt Kürze.
3. **Kein `any`.** TypeScript strict ist nicht verhandelbar.
4. **Keine Optimierungstricks.** Sauberer Code wird vom Compiler optimiert.
5. **Mobile-first.** Jede Komponente beginnt mit der mobilen Ansicht.
6. **Accessibility-first.** Semantik kommt vor Styling.

---

## Astro v7 — Verbindliche Patterns

Referenz: `knowledge/astro.md`

### Komponenten-Template

```astro
---
// Props immer als Interface exportieren
export interface Props {
  headline: string;
  subline?: string;
  ctaText: string;
  ctaHref: string;
}

const { headline, subline, ctaText, ctaHref } = Astro.props;

// i18n
import { useTranslations } from '@/i18n';
const t = useTranslations(Astro.currentLocale ?? 'de');
---

<!-- Semantisches HTML zuerst -->
<section aria-labelledby="hero-headline">
  <h1 id="hero-headline">{headline}</h1>
  {subline && <p>{subline}</p>}
  <a href={ctaHref} class="btn-primary">
    {ctaText}
  </a>
</section>
```

### Content Collections (nur blog template)

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
```

```astro
---
// Rendering in Astro v7:
import { getCollection, getEntry, render } from 'astro:content';

const posts = await getCollection('posts', ({ data }) => !data.draft);
const entry = await getEntry('posts', Astro.params.id);
const { Content } = await render(entry); // nicht entry.render()
---
<Content />
```

### Astro Actions

```typescript
// src/actions/contact.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

export const submitContactForm = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2).max(100),
    email: z.email(),          // Zod v4: z.email(), nicht z.string().email()
    message: z.string().min(10).max(2000),
  }),
  handler: async ({ name, email, message }) => {
    // Server-side Verarbeitung
    return { success: true };
  },
});
```

---

## TypeScript-Standards

```typescript
// ✅ Richtig
interface ComponentProps {
  title: string;
  items: Array<{ id: string; label: string }>;
}

function processItems(items: ComponentProps['items']): string[] {
  return items.map(item => item.label);
}

// ❌ Falsch
const processItems = (items: any[]) => {
  return items.map((item: any) => item.label);
};
```

### Zod v4 Syntax (WICHTIG)

```typescript
// ✅ Zod v4 (aktuell)
z.email()           // nicht z.string().email()
z.url()             // nicht z.string().url()
z.uuid()            // nicht z.string().uuid()

// ❌ Zod v3 (veraltet — Fehler in diesem Projekt)
z.string().email()
z.string().url()
```

---

## Tailwind v4 — CSS-first Patterns

Referenz: `knowledge/tailwind.md`

### Token-Integration

```css
/* shared/src/styles/theme.css */
@import "tailwindcss";

@theme {
  /* Design Tokens aus Phase 2 hier einbinden */
  --color-primary: oklch(0.55 0.18 250);
  --color-primary-foreground: white;
  
  --font-display: "Inter Variable", system-ui, sans-serif;
  --font-body: "Inter Variable", system-ui, sans-serif;
  
  --radius-btn: 0.5rem;
}
```

### Komponentenklassen

```css
/* Wiederverwendbare Klassen — nicht inline-Utilities in Astro */
@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2
           px-6 py-3 rounded-btn
           bg-primary text-primary-foreground
           font-medium text-sm
           transition-colors duration-150
           hover:bg-primary/90
           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
           disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2
           px-6 py-3 rounded-btn
           border border-current
           font-medium text-sm
           transition-colors duration-150
           hover:bg-current/10
           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current;
  }
}
```

---

## Svelte 5 Runes — Interaktive Komponenten

```svelte
<!-- ThemeToggle.svelte -->
<script lang="ts">
  // Svelte 5: $state statt let
  let isDark = $state(false);
  
  // $derived statt $: 
  let label = $derived(isDark ? 'Light Mode aktivieren' : 'Dark Mode aktivieren');
  
  function toggle() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  // $effect statt onMount für DOM-Zugriff
  $effect(() => {
    isDark = localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  });
</script>

<button
  onclick={toggle}
  aria-label={label}
  aria-pressed={isDark}
>
  {#if isDark}
    <!-- Sun Icon -->
  {:else}
    <!-- Moon Icon -->
  {/if}
</button>
```

---

## Accessibility-Implementierung

Referenz: `knowledge/accessibility.md`

### Pflicht-Checkliste pro Komponente

```
[ ] Semantisches HTML-Element (kein div wo nav, button, h1 passt)
[ ] aria-label auf Icons ohne sichtbaren Text
[ ] aria-hidden auf dekorativen Elementen
[ ] focus-visible Styles definiert
[ ] Kontrastverhältnis geprüft (≥ 4.5:1 für Text)
[ ] keyboard-zugänglich (Tab, Enter, Space, Escape)
[ ] aria-expanded / aria-controls bei Toggle-Elementen
[ ] role="alert" für dynamische Fehlermeldungen
[ ] img alt-Text (leer für dekorative, beschreibend für inhaltliche Bilder)
```

### Skip Link (immer erstes Element)

```astro
<!-- src/layouts/Base.astro -->
<body>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
  >
    Zum Hauptinhalt springen
  </a>
  <!-- ... -->
  <main id="main-content" tabindex="-1">
    <slot />
  </main>
</body>
```

### Formulare

```astro
<form method="POST" action={actions.submitContactForm} novalidate>
  <div>
    <label for="name">
      Name
      <span aria-hidden="true">*</span>
      <span class="sr-only">(Pflichtfeld)</span>
    </label>
    <input
      id="name"
      name="name"
      type="text"
      autocomplete="name"
      required
      aria-required="true"
      aria-describedby={nameError ? "name-error" : undefined}
    />
    {nameError && (
      <p id="name-error" role="alert" aria-live="polite">
        {nameError}
      </p>
    )}
  </div>
</form>
```

---

## Performance-Implementierung

Referenz: `knowledge/performance.md`

### Bilder

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- Immer width, height, alt, loading -->
<Image
  src={heroImage}
  alt="Beschreibender Alt-Text"
  width={1200}
  height={630}
  loading="eager"    <!-- hero: eager; unter fold: lazy -->
  decoding="async"
  format="webp"
  quality={85}
/>
```

### Fonts laden

Bevorzuge self-hosted Fonts oder bereits vorhandene Fontsource-Pakete. Externe Font-CDNs nur verwenden, wenn der Projektkontext das erlaubt und Datenschutz, Preconnect und `font-display` geklärt sind.

### JavaScript minimieren

```astro
---
// Kein client:load ohne Grund
// Präferenz: client:idle > client:visible > client:load
---

<!-- Nur wenn wirklich interaktiv -->
<ThemeToggle client:idle />

<!-- Nur wenn im Viewport -->
<AnimatedCounter client:visible />
```

---

## OG Image Generation

```typescript
// scripts/generate-og.ts
// Läuft vor astro build
// Output: public/og/*.png (1200x630)

// Für Blog-Posts: liest MDX frontmatter automatisch
// Wird in den Apps über scripts/generate-og.ts vor dem Build erzeugt.
```

---

## Biome — Code Quality

```bash
# Lint + Format prüfen
pnpm check

# Autofix
pnpm check:fix

# Nur bestimmte Datei
pnpm exec biome check apps/starter/src/components/Hero.astro
```

Keine ESLint, kein Prettier. Biome läuft über die Workspace-Scripts.

---

## Implementierungs-Reihenfolge

```
1. Bestehende App- und Shared-Struktur prüfen
2. Shared Tokens und globale Styles nur bei Bedarf ändern
3. Shared UI-Komponenten erweitern statt duplizieren
4. App-Seiten und App-Actions implementieren
5. i18n-Texte in der jeweiligen App ergänzen
6. Content Collections nur im Blog anfassen
7. OG Images und Site Files prüfen
8. Performance- und Accessibility-Audit gezielt durchführen
```

---

## Qualitätsprüfung vor Phase 5

```bash
# TypeScript
pnpm type-check

# Biome
pnpm check

# Build
pnpm build

# Preview
pnpm preview
```

Kein Fortfahren mit Fehlern in TypeScript oder Biome.
