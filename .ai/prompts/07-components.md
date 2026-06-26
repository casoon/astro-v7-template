# 07 — Komponentenbibliothek & Implementierung

**Input:** Layout-Plan (prompts/06-layout.md), Design Tokens  
**Rollen:** Senior Astro Architect, Senior Frontend Engineer, Accessibility & Performance Engineer  
**Referenz:** knowledge/astro.md, knowledge/tailwind.md, knowledge/accessibility.md

---

## Implementierungs-Reihenfolge

Immer in dieser Reihenfolge. Kein Überspringen, kein paralleles Entwickeln.

```
1. Token-System (src/styles/tokens.css)
2. Global Styles + Reset (src/styles/global.css)
3. Base Layout (src/layouts/Base.astro)
4. PageSEO-Komponente (src/components/seo/PageSEO.astro)
5. Navbar + Footer
6. Primitive UI: Button, Card, Badge, Input
7. Startseite — Abschnitt für Abschnitt (von oben)
8. Alle weiteren Seiten
9. i18n Integration
10. Svelte 5 Islands (ThemeToggle, interaktive Elemente)
11. Formulare + Actions
12. Dark Mode
13. OG Images (scripts/generate-og.ts)
14. Performance-Optimierung
15. Accessibility-Audit
```

---

## Base Layout

```astro
---
// src/layouts/Base.astro
import PageSEO from '@/components/seo/PageSEO.astro';
import { ClientRouter } from 'astro:transitions';

export interface Props {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

const { title, description, ogImage, noindex } = Astro.props;
---

<!DOCTYPE html>
<html lang={Astro.currentLocale ?? 'de'} class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <PageSEO
    title={title}
    description={description}
    ogImage={ogImage}
    noindex={noindex}
  />
  
  <!-- Font Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  
  <!-- ClientRouter für View Transitions -->
  <ClientRouter />
</head>
<body class="bg-[--color-bg-base] text-[--color-text-primary] antialiased">
  
  <!-- Skip Navigation (erstes Element im body) -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
           focus:px-4 focus:py-2 focus:bg-[--color-brand] focus:text-white
           focus:rounded-[--radius-md] focus:shadow-lg"
  >
    Zum Hauptinhalt springen
  </a>
  
  <slot name="header" />
  
  <main id="main-content" tabindex="-1">
    <slot />
  </main>
  
  <slot name="footer" />
  
  <!-- Dark Mode Script (vor body-render) -->
  <script is:inline>
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  </script>
</body>
</html>
```

---

## Komponentenstandard

**Jede Astro-Komponente folgt diesem Aufbau:**

```astro
---
// 1. Imports
import type { ComponentChild } from 'astro';

// 2. Props Interface (immer exportiert)
export interface Props {
  // required props zuerst
  title: string;
  // optional props mit Default
  variant?: 'primary' | 'secondary';
  class?: string;
}

// 3. Props destrukturieren mit Defaults
const {
  title,
  variant = 'primary',
  class: className,
} = Astro.props;

// 4. Computed values
const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
};
---

<!-- 5. Semantisches HTML, keine unnötigen divs -->
<element
  class:list={[
    'base-class',
    variantClasses[variant],
    className,
  ]}
>
  <slot />
</element>
```

---

## Komponenten-Referenz

### Button.astro

```astro
---
export interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  external?: boolean;
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  external = false,
  class: className,
} = Astro.props;

const Tag = href ? 'a' : 'button';

const externalAttrs = href && external ? {
  target: '_blank',
  rel: 'noopener noreferrer',
} : {};
---

<Tag
  href={href}
  type={href ? undefined : type}
  disabled={href ? undefined : disabled}
  aria-disabled={href && disabled ? 'true' : undefined}
  {...externalAttrs}
  class:list={[
    'btn-base',
    `btn-${variant}`,
    `btn-${size}`,
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  ]}
>
  <slot />
  {external && href && (
    <span class="sr-only">(öffnet in neuem Tab)</span>
  )}
</Tag>
```

CSS in tokens.css:
```css
@layer components {
  .btn-base {
    @apply inline-flex items-center justify-center gap-2
           font-medium leading-none no-underline
           transition-colors duration-[--duration-fast]
           focus-visible:outline-2 focus-visible:outline-offset-2
           focus-visible:outline-[--color-brand];
  }
  
  .btn-sm   { @apply px-3 py-2 rounded-[--radius-sm] text-sm; }
  .btn-md   { @apply px-5 py-2.5 rounded-[--radius-md] text-sm; }
  .btn-lg   { @apply px-7 py-3.5 rounded-[--radius-lg] text-base; }
  
  .btn-primary {
    @apply bg-[--btn-primary-bg] text-[--btn-primary-fg]
           hover:bg-[--btn-primary-bg-hover];
  }
  .btn-secondary {
    @apply border border-[--color-border-strong] text-[--color-text-primary]
           hover:bg-[--color-bg-subtle];
  }
  .btn-ghost {
    @apply text-[--color-text-secondary] hover:bg-[--color-bg-subtle]
           hover:text-[--color-text-primary];
  }
  .btn-link {
    @apply text-[--color-brand] underline-offset-4 hover:underline;
  }
}
```

### PageSEO.astro

```astro
---
export interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

const {
  title,
  description,
  ogImage,
  canonical,
  noindex = false,
  jsonLd,
} = Astro.props;

const canonicalUrl = canonical ?? Astro.url.href;
const ogImageUrl = ogImage ?? `${Astro.site}og/default.png`;

const jsonLdArray = jsonLd
  ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  : [];
---

<!-- Base -->
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />
{noindex && <meta name="robots" content="noindex, nofollow" />}

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:type" content="website" />
<meta property="og:locale" content={Astro.currentLocale === 'en' ? 'en_US' : 'de_DE'} />

<!-- Twitter/X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />

<!-- i18n (wenn mehrsprachig) -->
<!-- hreflang Tags werden in den Seiten gesetzt, da Route-spezifisch -->

<!-- JSON-LD -->
{jsonLdArray.map(schema => (
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
))}
```

### ThemeToggle.svelte

```svelte
<script lang="ts">
  import { Sun, Moon } from '@lucide/svelte';
  
  let isDark = $state(false);
  let label = $derived(isDark ? 'Light Mode aktivieren' : 'Dark Mode aktivieren');
  
  $effect(() => {
    // Initialisierung: aus localStorage oder System-Präferenz
    isDark = localStorage.getItem('theme') === 'dark'
      || (!localStorage.getItem('theme')
          && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  function toggle() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
</script>

<button
  onclick={toggle}
  aria-label={label}
  aria-pressed={isDark}
  class="p-2 rounded-[--radius-md] text-[--color-text-secondary]
         hover:bg-[--color-bg-subtle] hover:text-[--color-text-primary]
         transition-colors duration-[--duration-fast]
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-brand]"
>
  {#if isDark}
    <Sun size={20} aria-hidden="true" />
  {:else}
    <Moon size={20} aria-hidden="true" />
  {/if}
</button>
```

### Kontaktformular mit Action

```astro
---
import { actions } from 'astro:actions';
const result = Astro.getActionResult(actions.submitContactForm);
const hasError = result && !result.data?.success;
const hasSuccess = result?.data?.success;
---

{hasSuccess ? (
  <div role="alert" aria-live="assertive" class="success-message">
    <p><strong>Vielen Dank!</strong> Wir melden uns innerhalb von 24 Stunden.</p>
  </div>
) : (
  <form method="POST" action={actions.submitContactForm} novalidate>
    
    {hasError && (
      <div role="alert" class="error-banner">
        Bitte prüfe deine Angaben und versuche es erneut.
      </div>
    )}
    
    <div class="form-field">
      <label for="name">
        Name
        <span aria-hidden="true"> *</span>
        <span class="sr-only">(Pflichtfeld)</span>
      </label>
      <input
        id="name"
        name="name"
        type="text"
        autocomplete="name"
        required
        aria-required="true"
      />
    </div>
    
    <div class="form-field">
      <label for="email">
        E-Mail-Adresse
        <span aria-hidden="true"> *</span>
        <span class="sr-only">(Pflichtfeld)</span>
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        required
        aria-required="true"
      />
    </div>
    
    <div class="form-field">
      <label for="message">Nachricht</label>
      <textarea
        id="message"
        name="message"
        rows="5"
        required
        aria-required="true"
      ></textarea>
    </div>
    
    <button type="submit" class="btn-primary btn-lg">
      [CTA-Text aus copywriting.md]
    </button>
    
    <p class="text-sm text-[--color-text-tertiary]">
      [Mikro-Kopie Risikominimierung aus copywriting.md]
    </p>
    
  </form>
)}
```

---

## TypeScript-Standards

```typescript
// ✅ Korrekte Props
export interface Props {
  items: Array<{ id: string; label: string; href: string }>;
  variant?: 'default' | 'compact';
}

// ✅ Zod v4 in Actions
import { z } from 'astro/zod';

z.object({
  email: z.email(),      // nicht z.string().email()
  url: z.url(),          // nicht z.string().url()
  name: z.string().min(2).max(100),
})

// ❌ Niemals
const processData = (data: any) => { ... }
```

---

## Performance-Checkliste pro Komponente

```
[ ] Bilder: Astro <Image> mit width + height + loading + alt
[ ] Fonts: Nur in Base.astro laden, nicht in Komponenten
[ ] JavaScript: Welche client: directive? Nötig?
[ ] CSS: Klassen in @layer components, kein Utility-Spam
[ ] SVG-Icons: aria-hidden wenn dekorativ
[ ] Animationen: prefers-reduced-motion berücksichtigt?
```

---

## Validierung nach Implementierung

```bash
# TypeScript
pnpm type-check

# Linting + Formatting
pnpm check
pnpm check:fix  # autofix

# Build
pnpm build

# Preview
pnpm preview
```

**Alle müssen grün sein bevor du weitermachst.**

→ Weiter mit Phase 5 (Assets): `prompts/05-images.md` / `prompts/phases/05-assets.md`  
→ Danach Phase 6 (Quality Review): `prompts/08-quality.md`
