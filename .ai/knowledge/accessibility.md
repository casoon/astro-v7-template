# Accessibility — WCAG 2.2 Level AA

## Kernprinzipien (POUR)

- **Wahrnehmbar** — Alle Inhalte sind für alle Sinne zugänglich
- **Bedienbar** — Alle Funktionen per Tastatur erreichbar
- **Verständlich** — Inhalte und UI sind klar
- **Robust** — Funktioniert mit Assistive Technologies

## Kontrast-Anforderungen

| Typ | Minimum |
|-----|---------|
| Normaler Text (< 18pt) | 4.5:1 |
| Großer Text (≥ 18pt / 14pt Bold) | 3:1 |
| UI-Komponenten & Grafiken | 3:1 |
| Dekorativ | kein Minimum |

OKLCH-Werte: L-Differenz ≥ 0.4 ist eine grobe Faustregel, aber immer messen.

Tool: Chrome DevTools → Accessibility → Farben

## Semantisches HTML

```html
<!-- Landmark Regions -->
<header>          <!-- site header -->
  <nav>           <!-- primary nav -->
<main id="main-content">  <!-- page content -->
  <article>       <!-- self-contained content -->
  <section aria-labelledby="section-id">  <!-- thematic section -->
  <aside>         <!-- supplementary content -->
<footer>          <!-- site footer -->

<!-- Nie für Layout -->
<!-- ❌ <div class="nav"> -->
<!-- ✅ <nav> -->
```

## Heading-Hierarchie

```html
<!-- Nur eine H1 pro Seite -->
<h1>Haupttitel der Seite</h1>
  <h2>Abschnitt</h2>
    <h3>Unterabschnitt</h3>
  <h2>Weiterer Abschnitt</h2>

<!-- Keine Ebenen überspringen -->
<!-- ❌ <h1> → <h3> -->
<!-- ✅ <h1> → <h2> → <h3> -->
```

## Focus Management

```css
/* Nie einfach entfernen */
/* ❌ */
*:focus { outline: none; }

/* ✅ Eigenen Fokus-Stil definieren */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}
```

```astro
<!-- Skip Navigation (erstes Element im body) -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
         focus:z-50 focus:px-4 focus:py-2 focus:bg-primary
         focus:text-primary-foreground focus:rounded"
>
  Zum Hauptinhalt springen
</a>
```

## Bilder

```astro
<!-- Inhaltliche Bilder: beschreibender Alt-Text -->
<img src="..." alt="Team-Foto: 5 Personen vor dem Bürogebäude in Hamburg" />

<!-- Dekorative Bilder: leerer Alt-Text -->
<img src="decorative-wave.svg" alt="" />

<!-- Icons ohne Text: aria-label am Button/Link -->
<button aria-label="Menü öffnen">
  <MenuIcon aria-hidden="true" />
</button>
```

## Formulare

```html
<!-- Label immer mit input verknüpft -->
<label for="email">
  E-Mail-Adresse
  <span aria-hidden="true"> *</span>
  <span class="sr-only">(Pflichtfeld)</span>
</label>
<input
  id="email"
  type="email"
  name="email"
  required
  aria-required="true"
  autocomplete="email"
  aria-describedby="email-hint email-error"
/>
<p id="email-hint" class="text-sm text-neutral-500">
  Wir senden keine Werbemails.
</p>
<!-- Fehlermeldungen: role="alert" für sofortige Ankündigung -->
<p id="email-error" role="alert" aria-live="polite" class="text-error">
  Bitte gib eine gültige E-Mail-Adresse ein.
</p>
```

## Interaktive Elemente

```html
<!-- Toggle-Elemente: aria-expanded + aria-controls -->
<button
  aria-expanded="false"
  aria-controls="mobile-menu"
  onclick="toggleMenu()"
>
  Menü
</button>
<nav id="mobile-menu" hidden>
  <!-- ... -->
</nav>

<!-- Tabs -->
<div role="tablist" aria-label="Produktpläne">
  <button role="tab" aria-selected="true" aria-controls="panel-starter">Starter</button>
  <button role="tab" aria-selected="false" aria-controls="panel-pro">Pro</button>
</div>
<div id="panel-starter" role="tabpanel">...</div>
<div id="panel-pro" role="tabpanel" hidden>...</div>
```

## Dynamische Inhalte

```html
<!-- Statusmeldungen: aria-live -->
<div aria-live="polite" aria-atomic="true">
  <!-- Ändert sich: "Formular erfolgreich gesendet." -->
</div>

<!-- Kritische Fehler: role="alert" (aggressiver) -->
<div role="alert">
  Verbindungsfehler. Bitte versuche es erneut.
</div>

<!-- Ladeindikator -->
<div role="status" aria-label="Wird geladen...">
  <span class="sr-only">Wird geladen...</span>
  <!-- Spinner-Animation -->
</div>
```

## Touch-Targets

```css
/* Zielgröße: mindestens 44x44px; WCAG 2.2 AA erlaubt Ausnahmen,
   aber Navigation, CTAs und Formularcontrols sollen 44x44px erreichen. */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 20px;
}

/* Kleine Icons: padding erhöhen statt icon vergrößern */
.icon-btn {
  padding: 10px;  /* 20px Icon + 2×10px Padding = 40px → aufpassen */
}
```

## Animationen

```css
/* Immer prefers-reduced-motion respektieren */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
    opacity: 1;  /* Sofort sichtbar statt ausgeblendet */
  }
  
  .scroll-trigger {
    opacity: 1;
    transform: none;
  }
}
```

## Testing-Checkliste

### Automatisiert (axe-core)
```typescript
// e2e/accessibility.test.ts
import AxeBuilder from '@axe-core/playwright';

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

### Manuell
```
[ ] Tab durch die gesamte Seite — alle Elemente erreichbar?
[ ] Shift+Tab — rückwärts navigierbar?
[ ] Enter/Space — alle Buttons/Links aktivierbar?
[ ] Escape — Modals schließbar?
[ ] Screen Reader (VoiceOver Mac: Cmd+F5)
[ ] Kontrast aller Texte geprüft
[ ] Zoom auf 200% — kein Overflow, kein Überlappen
[ ] Print: navigation ausgeblendet?
```

## Häufige Fehler

```
❌ <div onclick="...">  → ✅ <button onclick="...">
❌ <a href="#">Text</a>  → ✅ <button>Text</button> (wenn kein Link)
❌ aria-label auf <div>  → aria-label nur auf interaktive/landmark Elemente
❌ placeholder als Label  → immer echtes <label>
❌ Farbe als einzige Info  → immer auch Text/Icon/Form
❌ outline: none global  → nur auf :focus, nicht :focus-visible
```
