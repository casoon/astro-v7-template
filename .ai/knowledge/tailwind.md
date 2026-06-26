# Tailwind v4 — Internes Wissen

## CSS-first Ansatz

Tailwind v4 hat keine `tailwind.config.js` mehr. Alles in CSS:

```css
@import "tailwindcss";

@theme {
  /* Hier alle Anpassungen */
  --color-primary: oklch(0.55 0.18 250);
  --font-display: "Inter Variable", system-ui, sans-serif;
}
```

## OKLCH Farben

OKLCH ist der Standard für neue Design Tokens in diesem Projekt. Bestehende Werte nicht ohne Grund umformatieren.

```
oklch(L C H)
  L = Helligkeit (0-1)
  C = Chroma / Sättigung (0-0.4)
  H = Hue / Farbton (0-360)

Wichtig:
  - Gleiche L-Werte → gleiche wahrgenommene Helligkeit (unabhängig vom Farbton)
  - Deshalb ideal für konsistente Farbpaletten
  - Einfache Dark-Mode-Anpassung via L-Wert
```

Beispiel-Palette aufbauen:
```css
/* Primär-Palette (gleicher Hue, verschiedene L/C) */
--color-primary-50:  oklch(0.95 0.03 250);
--color-primary-100: oklch(0.90 0.06 250);
--color-primary-200: oklch(0.80 0.10 250);
--color-primary-300: oklch(0.70 0.14 250);
--color-primary-400: oklch(0.60 0.18 250);
--color-primary-500: oklch(0.55 0.20 250);  /* Basis */
--color-primary-600: oklch(0.45 0.18 250);
--color-primary-700: oklch(0.38 0.15 250);
--color-primary-800: oklch(0.30 0.10 250);
--color-primary-900: oklch(0.20 0.06 250);
```

## Vite Plugin (statt PostCSS)

```typescript
// astro.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

## Design Token System

Drei Ebenen in `shared/src/styles/variables.css` und `shared/src/styles/theme.css`:

```css
@import "tailwindcss";

/* Ebene 1: Primitive */
@theme {
  --primitive-blue-500: oklch(0.55 0.18 250);
  --primitive-neutral-900: oklch(0.15 0.01 250);
  --primitive-neutral-50: oklch(0.98 0.005 250);
}

/* Ebene 2: Semantisch */
@theme {
  --color-brand: var(--primitive-blue-500);
  --color-text: var(--primitive-neutral-900);
  --color-bg: var(--primitive-neutral-50);
}

/* Ebene 3: Komponenten (als CSS, nicht @theme) */
@layer components {
  .card {
    background: var(--color-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }
}
```

## Dark Mode

Class-based (`.dark` auf `<html>`):

```css
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --color-text: var(--primitive-neutral-50);
    --color-bg: var(--primitive-neutral-900);
  }
}

.dark {
  --color-text: var(--primitive-neutral-50);
  --color-bg: var(--primitive-neutral-900);
}
```

## Motion Tokens

```css
@theme {
  /* Dauer */
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;
  
  /* Easing */
  --ease-in:     cubic-bezier(0.4, 0, 1, 1);
  --ease-out:    cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Design

Mobile-first (immer ohne Prefix beginnen):

```html
<!-- ✅ Mobile-first -->
<div class="text-sm md:text-base lg:text-lg">

<!-- ❌ Desktop-first (nicht in diesem Projekt) -->
<div class="text-lg lg:text-base md:text-sm">
```

Breakpoints:
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

## Container

```html
<!-- Zentrierter Container -->
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
```

## Komponenten-Klassen (nicht Utility-Spam)

Statt 15 Utilities inline, Klassen in `@layer components`:

```css
@layer components {
  .section {
    @apply py-16 md:py-24 lg:py-32;
  }
  
  .section-title {
    @apply text-3xl font-bold tracking-tight sm:text-4xl;
  }
  
  .prose-custom {
    @apply prose prose-lg max-w-none
           prose-headings:font-bold
           prose-a:text-primary;
  }
}
```

## Typografie-Skala

```css
@theme {
  /* Fluid Type (clamp) */
  --text-display: clamp(2.5rem, 5vw + 1rem, 5rem);
  --text-h1:      clamp(2rem, 4vw + 0.5rem, 3.5rem);
  --text-h2:      clamp(1.5rem, 3vw + 0.5rem, 2.5rem);
  --text-h3:      clamp(1.25rem, 2vw + 0.25rem, 1.875rem);
  --text-body:    1rem;
}
```

Body-Text nicht mit Viewport-Breite skalieren. Fluid Type nur für echte Display- und Heading-Größen einsetzen.

## Häufige Patterns

### Flex Center
```html
<div class="flex items-center justify-center gap-4">
```

### Grid Responsive
```html
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

### Aspect Ratio
```html
<div class="aspect-video overflow-hidden rounded-lg">
  <img class="h-full w-full object-cover" ...>
</div>
```

### Visually Hidden (Accessibility)
```html
<span class="sr-only">Für Screenreader</span>
```

### Focus Visible
```html
<button class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
```
