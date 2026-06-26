# Performance — Internes Wissen

## Performance Budget

```yaml
lighthouse:
  performance:      90
  accessibility:   100
  best_practices:   95
  seo:             100

core_web_vitals:
  LCP: "< 2.5s"
  INP: "< 200ms"
  CLS: "< 0.1"

bundle:
  initial_js:  "< 50kb gzipped"
  initial_css: "< 20kb gzipped"
  total_js:    "< 200kb gzipped"

bilder:
  hero_webp:  "< 200kb"
  body_webp:  "< 100kb"
  thumbnail:  "< 30kb"
```

## Astro Performance-Vorteile

Astro sendet standardmäßig **0 KB JavaScript** — außer für explizit markierte Islands.

```astro
<!-- Kein JS — statisches HTML -->
<MyComponent />

<!-- Mit JS — nur wenn nötig -->
<MyComponent client:idle />    <!-- nach idle -->
<MyComponent client:visible /> <!-- wenn sichtbar -->
<MyComponent client:load />    <!-- sofort (vermeiden) -->
<MyComponent client:media="(max-width: 768px)" />
```

Priorität: `client:idle` > `client:visible` >> `client:load`

## Bilder

### Astro Image Component

```astro
---
import { Image, Picture } from 'astro:assets';
import heroImg from '../assets/hero.jpg';
---

<!-- Statisches Bild: Image -->
<Image
  src={heroImg}
  alt="Beschreibender Alt-Text"
  width={1200}
  height={630}
  format="webp"
  quality={85}
  loading="eager"      <!-- hero: eager -->
  fetchpriority="high" <!-- LCP-Bild: high -->
/>

<!-- Responsives Bild mit mehreren Formaten: Picture -->
<Picture
  src={heroImg}
  formats={['avif', 'webp']}
  widths={[400, 800, 1200]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  alt="..."
  loading="lazy"
/>
```

### Konvertierung zu WebP

Referenz: `image-to-webp` Skill für batch conversion.

```bash
# Einzelbild
cwebp -q 85 input.jpg -o output.webp

# Verzeichnis (bash loop)
for f in src/assets/*.jpg; do
  cwebp -q 85 "$f" -o "${f%.jpg}.webp"
done
```

### Lazy Loading

```astro
<!-- Unter dem Fold: lazy -->
<Image src={...} alt="..." loading="lazy" />

<!-- Kritischer Pfad / Hero: eager -->
<Image src={hero} alt="..." loading="eager" fetchpriority="high" />
```

## Fonts

### Variable Fonts bevorzugen

```html
<!-- Variable Font: eine Datei, alle Gewichte -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
  rel="stylesheet"
/>
```

### Font Display Swap

```css
@font-face {
  font-family: 'Inter';
  font-display: swap;  /* FOUT statt FOIT */
  /* ... */
}
```

### Preload kritische Fonts

```html
<link
  rel="preload"
  href="/fonts/inter-variable.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

## JavaScript Minimierung

```
Grundregel: Kein JS ohne konkreten Interaktions-Bedarf.

✅ Erlaubt ohne Diskussion:
  - Theme Toggle (Dark Mode)
  - Mobile Navigation Toggle
  - Accordion / FAQ
  - Smooth Scroll
  - Form Validation Feedback

⚠️ Nur mit Begründung:
  - Animationen (besser: CSS)
  - Parallax (oft CLS-Ursache)
  - Infinite Scroll
  - Live Search

❌ Nicht nötig:
  - jQuery
  - Lodash/Underscore
  - Moment.js (→ Intl API)
  - Große Chart-Libraries für einfache Diagramme
```

## CSS Performance

```css
/* Vermeiden: teurer Selektor */
* { box-sizing: border-box; }  /* Global OK, aber sparsam */

/* Will-change nur wenn wirklich animiert */
.animated-element {
  will-change: transform;  /* Nur während Animation, danach entfernen */
}

/* Content-visibility für lange Listen */
.card-list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 300px;  /* geschätzte Höhe */
}
```

## Critical CSS

Astro rendert CSS inline für kritischen Pfad automatisch. Hilfe geben:

```astro
<!-- Kritisches CSS im Head (Astro macht das per Default) -->
<style is:global>
  /* Above-the-fold Styles — Astro inlined diese automatisch */
</style>
```

## Layout Shift (CLS) vermeiden

```astro
<!-- Immer width + height angeben -->
<img src="..." alt="..." width="1200" height="630" />
<Image src={...} width={1200} height={630} alt="..." />

<!-- Aspect Ratio für responsive Bilder -->
<div class="aspect-video">
  <img class="w-full h-full object-cover" ... />
</div>

<!-- Skeleton für dynamischen Content -->
<div class="h-48 animate-pulse bg-neutral-200 rounded" aria-hidden="true" />
```

## Prefetch & Preload

```astro
<!-- Link Prefetch für wahrscheinliche Navigation -->
<link rel="prefetch" href="/contact/" />

<!-- Preload für kritische Ressourcen -->
<link rel="preload" as="image" href="/hero.webp" />
<link rel="preload" as="font" href="/fonts/inter.woff2" type="font/woff2" crossorigin />

<!-- DNS Prefetch für externe Domains -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

## Caching Headers (Cloudflare)

```typescript
// Statische Assets: lang cachen
Cache-Control: public, max-age=31536000, immutable

// HTML: kurz cachen, validieren
Cache-Control: public, max-age=3600, must-revalidate

// API: kein Cache
Cache-Control: no-store
```

## Monitoring

```bash
# Lokal
pnpm build
pnpm preview
# → Chrome DevTools → Lighthouse

# Bundle-Analyse
pnpm build
# → dist/_astro/ → Dateigrößen prüfen
```

## Häufige Performance-Fallen

```
❌ hero-bild mit loading="lazy"
   → LCP steigt massiv. Hero immer eager + fetchpriority="high"

❌ Viele kleine Requests statt einer Datei
   → HTTP/2 hilft, aber weniger ist besser

❌ Render-blocking JS im <head>
   → Astro macht das richtig by default, nicht überschreiben

❌ Google Fonts ohne preconnect
   → Immer preconnect vor dem stylesheet link

❌ Unoptimierte SVGs
   → SVGs mit SVGO optimieren, oder einfaches inline SVG

❌ Zu viele Web Fonts (> 2-3)
   → Jeder Font ist ein Request. Variable Fonts nutzen.
```
