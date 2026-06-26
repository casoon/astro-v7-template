# 08 — Quality Gates & Scoring

**Input:** Vollständig implementiertes Projekt  
**Rollen:** Alle Rollen — jeder prüft aus seiner Perspektive  
**Referenz:** knowledge/accessibility.md, knowledge/performance.md, knowledge/seo.md

---

## Quality Score System

```
Jeder Checkpoint = 1 Punkt.
Score = (bestanden / gesamt) × 100

≥ 90%: Freigabe sofort
80-89%: Kleinere Korrekturen → dann Freigabe
70-79%: Wesentliche Korrekturen nötig
< 70%:  Kein Launch. Zurück zur betroffenen Phase.
```

---

## Gate 1: Strategie (8 Punkte)

```
[ ] 1. Positioning Statement formuliert (nicht "Qualität" oder "Service")
[ ] 2. Persona als konkrete Person beschrieben (Name, Beruf, Situation)
[ ] 3. Mindestens 3 Einwände dokumentiert
[ ] 4. Mindestens 2 Wettbewerber analysiert
[ ] 5. Differenzierung besteht den Austauschbarkeits-Test
[ ] 6. Primärer CTA definiert und klar (Verb + Nutzen)
[ ] 7. Mindestens eine messbare Erfolgsmetrik
[ ] 8. E-E-A-T Strategie für mindestens 2 Dimensionen definiert

Score: [x/8]
Offene Punkte: [...]
```

---

## Gate 2: Creative (7 Punkte)

```
[ ] 1. Farbsystem vollständig (3 Ebenen, alle OKLCH, Dark Mode)
[ ] 2. Kontrast geprüft — alle Kombinationen ≥ 4.5:1 (Text) / ≥ 3:1 (UI)
[ ] 3. Typografie-System vollständig (Display, Body, Mono, Fluid Sizes)
[ ] 4. Motion-Konzept definiert (Dauer, Easing, Reduced Motion)
[ ] 5. Scroll-Dramaturgie für Startseite dokumentiert
[ ] 6. Reflection Loop durchgeführt (dokumentiert)
[ ] 7. Positioning Statement in jedem Element erkennbar (Stichprobe)

Score: [x/7]
Offene Punkte: [...]
```

---

## Gate 3: Copy (6 Punkte)

```
[ ] 1. Kein Agentur-Deutsch ("ganzheitlich", "maßgeschneidert", etc.)
[ ] 2. Alle CTAs: Verb + Nutzen, max 5 Wörter
[ ] 3. Alle 3 Einwände sind auf der Website beantwortet
[ ] 4. Nutzen statt Features (keine reine Feature-Liste)
[ ] 5. Laut gelesen: klingt wie ein Mensch, nicht wie Marketing
[ ] 6. Kein Placeholder-Text auf der Website

Score: [x/6]
Offene Punkte: [...]
```

---

## Gate 4: Implementierung (7 Punkte)

```bash
# Führe alle aus:
pnpm type-check   # → 0 Errors
pnpm check        # → 0 Errors
pnpm build        # → successful
```

```
[ ] 1. TypeScript: 0 Fehler
[ ] 2. Biome: 0 Fehler
[ ] 3. Build: erfolgreich
[ ] 4. Kein neues `any` in TypeScript (`rg "\\bany\\b" apps shared`)
[ ] 5. Alle Astro v7 Breaking Changes korrekt umgesetzt
[ ] 6. Kein console.error im Browser (alle Seiten prüfen)
[ ] 7. Alle Komponenten haben Interface Props exportiert

Score: [x/7]
Offene Punkte: [...]
```

---

## Gate 5: Accessibility (9 Punkte)

```bash
# Automatisiert, wenn die betroffene App gebaut ist:
pnpm test:e2e:starter  # starter
pnpm test:e2e:blog     # blog
```

```
Automatisiert:
[ ] 1. axe-core: 0 Violations (alle Seiten)

Manuell — Keyboard:
[ ] 2. Tab-Navigation: alle interaktiven Elemente erreichbar
[ ] 3. Focus-Style sichtbar auf allen interaktiven Elementen
[ ] 4. Escape schließt alle Overlays/Modals
[ ] 5. Skip Link funktioniert (Tab → Enter → Hauptinhalt im Fokus)

Manuell — Struktur:
[ ] 6. Exakt eine H1 pro Seite
[ ] 7. Keine Heading-Ebenen übersprungen
[ ] 8. Alle Bilder haben sinnvollen Alt-Text

Manuell — Formulare:
[ ] 9. Alle Felder haben sichtbare Labels (kein Placeholder als Ersatz)

Score: [x/9]
Offene Punkte: [...]
```

---

## Gate 6: Performance (8 Punkte)

```bash
# Lokal testen:
pnpm build
pnpm preview
# → Chrome DevTools → Lighthouse → Analyze
```

```
Lighthouse:
[ ] 1. Performance:      ≥ 90
[ ] 2. Accessibility:   100
[ ] 3. Best Practices:   ≥ 95
[ ] 4. SEO:             100

Core Web Vitals:
[ ] 5. LCP:  < 2.5s
[ ] 6. CLS:  < 0.1

Bilder:
[ ] 7. Hero-Bild: loading="eager" + fetchpriority="high"
[ ] 8. Alle anderen Bilder: loading="lazy" + width + height gesetzt

Score: [x/8]
Offene Punkte: [...]
```

---

## Gate 7: SEO (8 Punkte)

```
Meta-Tags (alle Seiten):
[ ] 1. Title: 50-60 Zeichen, Focus Keyword enthalten
[ ] 2. Description: 120-160 Zeichen, handlungsorientiert
[ ] 3. Canonical: korrekt gesetzt

Open Graph:
[ ] 4. OG Image gesetzt (1200×630px, absolute URL)
[ ] 5. OG Title + Description gesetzt

Struktur:
[ ] 6. JSON-LD auf jeder Seite valide
    (Prüfen: Google Rich Results Test)
[ ] 7. sitemap.xml erreichbar und vollständig (`@casoon/astro-site-files`)
[ ] 8. hreflang-Tags korrekt (wenn mehrsprachig)

Score: [x/8]
Offene Punkte: [...]
```

---

## Gate 8: Launch-Bereitschaft (7 Punkte)

```
[ ] 1. Alle Seiten erreichbar (kein 404)
[ ] 2. Alle Links funktionieren (intere + externe)
[ ] 3. Formular(e) funktionieren (Test-Submit, Bestätigung erhalten)
[ ] 4. Dark Mode funktioniert auf allen Seiten
[ ] 5. Mobile Navigation funktioniert (375px testen)
[ ] 6. Impressum + Datenschutz verlinkt und korrekt
[ ] 7. OG Images erscheinen korrekt
    (Prüfen: opengraph.xyz oder LinkedIn Post Inspector)

Score: [x/7]
Offene Punkte: [...]
```

---

## Gesamtauswertung

```
Gate 1 Strategie:         [x/8]
Gate 2 Creative:          [x/7]
Gate 3 Copy:              [x/6]
Gate 4 Implementierung:   [x/7]
Gate 5 Accessibility:     [x/9]
Gate 6 Performance:       [x/8]
Gate 7 SEO:               [x/8]
Gate 8 Launch-Bereitschaft: [x/7]

─────────────────────────────
GESAMT:                   [x/60]
SCORE:                    [x%]

Lighthouse Performance:   [0-100]
Lighthouse Accessibility: [0-100]
Lighthouse Best Practices:[0-100]
Lighthouse SEO:           [0-100]

FREIGABE: [ ] JA   [ ] NEIN
BEGRÜNDUNG: [...]
```

---

## Häufige Probleme und Lösungen

### Lighthouse Performance < 90

```
LCP > 2.5s:
  → Hero-Bild prüfen: loading="eager"? fetchpriority="high"?
  → Bild-Dateigröße: WebP? < 200KB?
  → Preload Link im Head?

CLS > 0.1:
  → Alle Bilder: width + height gesetzt?
  → Fonts: font-display: swap?
  → Dynamischer Content: Platzhalter vorhanden?

Score generell niedrig:
  → Lighthouse in Chrome Incognito (keine Extensions)
  → Simulated Throttling vs. No Throttling — Unterschied?
  → JavaScript-Bundle analysieren: was ist groß?
```

### axe-core Violations

```
Häufigste Findings:
  "color-contrast": Kontrast zu gering
    → Token-Werte prüfen, OKLCH-Werte anpassen
  
  "label": Formularfeld ohne Label
    → <label for="id"> sicherstellen
  
  "image-alt": Fehlendes alt Attribut
    → alt="" für dekorative Bilder, beschreibend für inhaltliche
  
  "button-name": Button ohne zugänglichen Namen
    → aria-label oder sichtbaren Text hinzufügen
  
  "link-name": Link ohne zugänglichen Namen
    → aria-label oder sichtbaren Linktext
```

### TypeScript Fehler

```
"any" gefunden:
  → Type korrekt definieren (Interface, Type Alias)
  → Externe Library ohne Types? → @types/... installieren oder declare module

Props fehlen:
  → Interface Props vollständig? Alle Required Props beim Aufruf gesetzt?

Zod v4 Fehler:
  → z.string().email() → z.email()
  → z.string().url() → z.url()
```

---

→ Weiter mit Reflection & Red Team: `prompts/09-reflection.md`
