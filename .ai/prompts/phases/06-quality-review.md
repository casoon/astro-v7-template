# Phase 6 — Quality Review & Freigabe

**Rolle:** Alle Rollen — jeder prüft aus seiner Perspektive  
**Referenz:** Alle Knowledge-Dateien  
**Input:** Vollständige Implementierung aus Phase 4 + Assets aus Phase 5

---

## Review-Philosophie

Dieser Review ist kein Formalismus. Es ist die letzte Linie vor der Veröffentlichung.

Stelle dir vor, du hast diese Website noch nie gesehen. Du bist:
- Ein potenzieller Kunde der Zielgruppe
- Ein Accessibility-Auditor
- Ein Performance-Engineer
- Ein SEO-Spezialist
- Ein Red-Team-Mitglied, das absichtlich Fehler sucht

Jede dieser Perspektiven liefert einen eigenen Befund.

---

## Self Review — Perspektive: Nutzer

### Der 3-Sekunden-Test

Öffne die Startseite. Was siehst du in den ersten 3 Sekunden?

```
[ ] Ist sofort klar, was das Angebot ist?
[ ] Ist die Zielgruppe erkennbar?
[ ] Gibt es einen klaren nächsten Schritt?
[ ] Ist die Seite visuell ansprechend und professionell?
[ ] Gibt es nichts Ablenklendes oder Verwirrendes?
```

Wenn auch nur eine Antwort "Nein": Identifiziere das Problem und behebe es.

### Nutzerpfad-Test

Führe jeden definierten Pfad aus Phase 3 durch:

```
Pfad: [Name]
Startpunkt: [URL]

Schritt 1: [Was tut der Nutzer?]
  → Ergebnis: [Was passiert?]
  → Problem: [Was könnte unklar sein?]

Schritt 2: ...

Conversion-Point: [Was soll der Nutzer tun?]
  → Ist die Handlung offensichtlich und einfach?
  → Gibt es Reibung, die vermieden werden könnte?
```

### Mobile Test

Prüfe auf 375px Breite (iPhone SE):

```
[ ] Kein horizontaler Overflow
[ ] Schriften mindestens 16px (verhindert Auto-Zoom)
[ ] Touch-Targets mind. 44x44px
[ ] Navigation auf Mobile funktioniert
[ ] Formulare auf Mobile bedienbar
[ ] Bilder nicht zugeschnitten oder verzerrt
```

---

## Accessibility Review

Referenz: `knowledge/accessibility.md`

### Automatisierter Test

```bash
# Playwright E2E mit axe-core, gezielt nach betroffener App
pnpm test:e2e:starter
pnpm test:e2e:blog

# Erwartetes Ergebnis: 0 Violations
```

### Manueller Keyboard-Test

```
Öffne die Website ohne Maus.

[ ] Tab navigiert durch alle interaktiven Elemente in sinnvoller Reihenfolge
[ ] Fokus ist immer sichtbar (kein Outline: none ohne Ersatz)
[ ] Enter aktiviert Links und Buttons
[ ] Space aktiviert Checkboxen und Buttons
[ ] Escape schließt Modals und Drawer-Menüs
[ ] Skip-Link funktioniert (Tab auf Seitenanfang)
[ ] Formulare vollständig ausfüllbar
```

### Screen Reader Test (VoiceOver/NVDA)

```
[ ] Seitenstruktur logisch (Landmarks, Headings)
[ ] Bilder haben sinnvolle Alt-Texte
[ ] Icons ohne Text haben aria-label
[ ] Dynamische Inhalte werden angekündigt (aria-live)
[ ] Formulare: Labels, Fehler, Erfolgsmeldungen vorgelesen
```

### Kontrast-Check

```
Prüfe für jede Farb-Kombination:

Text auf Background:        mind. 4.5:1
Großer Text (≥18pt):        mind. 3:1
CTA-Text auf CTA-Background: mind. 4.5:1
Focus-Ring auf Background:   mind. 3:1

Tool: browser.style DevTools → Accessibility → Farben
```

---

## Performance Review

Referenz: `knowledge/performance.md`

### Lighthouse Audit

```bash
# Lokaler Build
pnpm build
pnpm preview

# Lighthouse in Chrome DevTools → Lighthouse Tab
# Alle 4 Kategorien prüfen
```

Mindestanforderungen:

| Kategorie | Minimum |
|-----------|---------|
| Performance | 90 |
| Accessibility | 100 |
| Best Practices | 95 |
| SEO | 100 |

### Core Web Vitals

```
LCP (Largest Contentful Paint):  < 2.5s
CLS (Cumulative Layout Shift):   < 0.1
INP (Interaction to Next Paint): < 200ms
```

Häufige Ursachen für schlechte Core Web Vitals:

```
LCP > 2.5s:
  - Hero-Bild nicht eager geladen
  - Bild zu groß (> 200kb unkomprimiert)
  - Kein Preload für LCP-Element
  - Server-Antwortzeit > 600ms

CLS > 0.1:
  - Bilder ohne width/height
  - Fonts laden zu spät (FOUT/FOUT)
  - Dynamisch eingefügter Inhalt ohne Platzhalter
  - Ads oder Embeds ohne reservierten Platz

INP > 200ms:
  - Schweres JavaScript blockiert Main Thread
  - Event Handler zu komplex
  - Viele DOM-Elemente
```

---

## SEO Review

Referenz: `knowledge/seo.md`

### Meta-Check (jede Seite)

```
[ ] <title>: 50-60 Zeichen, enthält primäres Keyword
[ ] <meta name="description">: 120-160 Zeichen, Call to Action
[ ] <link rel="canonical">: korrekte URL
[ ] <meta property="og:title">: gesetzt
[ ] <meta property="og:description">: gesetzt
[ ] <meta property="og:image">: 1200x630, absolute URL
[ ] <meta name="twitter:card">: summary_large_image
[ ] JSON-LD: korrekt und vollständig (Google Rich Results Test)
```

### Content-Check

```
[ ] Jede Seite hat genau eine H1
[ ] Heading-Hierarchie logisch (H1 → H2 → H3)
[ ] Keine fehlenden Alt-Texte auf Inhaltsbildern
[ ] Interne Links zwischen relevanten Seiten
[ ] Keine 404 Links
[ ] robots.txt korrekt
[ ] sitemap.xml wird via `@casoon/astro-site-files` generiert und ist erreichbar
```

### i18n SEO

```
[ ] <html lang="de"> (oder "en")
[ ] hreflang-Tags auf allen Seiten
[ ] Canonical auf die richtige Sprachversion
[ ] Keine duplizierten Inhalte zwischen Sprachversionen
```

---

## Conversion Review

Referenz: `knowledge/conversion.md`

### CTA-Analyse

```
Für jeden CTA auf der Website:

[ ] Ist der Nutzen des Klicks klar?
[ ] Ist der Text handlungsorientiert? (Verb + Nutzen)
[ ] Hebt sich der CTA visuell ausreichend ab?
[ ] Führt der CTA zur richtigen Zielseite?
[ ] Ist der Aufwand nach dem Klick kommuniziert?
    (z.B. "Kostenlose Demo buchen — 20 Minuten")
```

### Trust-Elemente

```
[ ] Social Proof vorhanden (Testimonials, Zahlen, Logos)
[ ] Kontaktmöglichkeit sichtbar und einfach
[ ] Datenschutz / Impressum verlinkt
[ ] Zertifikate, Awards oder Presse (wenn vorhanden)
[ ] Kein Broken Image, kein Placeholder-Text
```

### Formular-Optimierung

```
[ ] Minimale Pflichtfelder (nur was wirklich nötig ist)
[ ] Klare Fehlermeldungen auf Feldbene
[ ] Erfolgsmeldung nach Absenden
[ ] Keine unnötige Weiterleitung nach Submit
[ ] Spam-Schutz ohne CAPTCHA (oder honeypot)
[ ] DSGVO-konformes Datenschutzhinweis bei Formularen
```

---

## Red Team — Aktive Fehlersuche

Jetzt wechselst du die Haltung: **Finde Fehler.**

### Technische Angriffspunkte

```
[ ] Was passiert wenn JavaScript deaktiviert ist?
    → Kernfunktionalität muss ohne JS funktionieren
[ ] Was passiert bei sehr langsamem Internet (3G)?
    → Layout stabil? Fonts geladen?
[ ] Was passiert bei sehr großen Schriften (200% Zoom)?
    → Kein Overflow, kein überlappender Text?
[ ] Was passiert bei Print?
    → Navigation ausgeblendet? Farben Print-freundlich?
```

### Inhaltliche Angriffspunkte

```
[ ] Übernimmt die Headline zu viel? Ist sie unglaubwürdig?
[ ] Gibt es Claims ohne Beweis?
[ ] Gibt es Fachjargon, den die Zielgruppe nicht versteht?
[ ] Ist irgendetwas mehrdeutig oder unklar?
[ ] Fehlen Antworten auf die dokumentierten Einwände (Phase 1)?
```

### Wettbewerbs-Check

```
[ ] Unterscheidet sich die Website klar von den Wettbewerbern?
[ ] Ist die Differenzierung aus Phase 1 auf der Startseite sichtbar?
[ ] Würde die Zielgruppe diese Website bevorzugen?
    Wenn nein: Was muss sich ändern?
```

---

## Reflection — Gesamtbewertung

Nachdem alle Reviews abgeschlossen sind:

**Frage 1:** Was ist die eine Sache, die diese Website am meisten zurückhält?

**Frage 2:** Was ist die mutigste Verbesserung, die noch möglich wäre?

**Frage 3:** Würde der Creative Director, der Brand Strategist, der UX Lead und der Conversion Specialist alle zustimmen, dass dies ihr bestes Werk ist?

Wenn ein "Nein" dabei ist: Identifiziere was fehlt und behebe es.

---

## Qualitätsgates — Finale Freigabe

```
[ ] Lighthouse Performance 90+, Accessibility 100, SEO 100
[ ] axe-core: 0 Violations
[ ] TypeScript: 0 Fehler (pnpm type-check)
[ ] Biome: 0 Fehler (`pnpm check`)
[ ] Build: 0 Fehler (pnpm build)
[ ] Alle Seiten erreichbar, kein 404
[ ] OG Images korrekt (Open Graph Debugger)
[ ] JSON-LD valide (Google Rich Results Test)
[ ] Formulare funktionieren (Test-Submit)
[ ] Dark Mode funktioniert
[ ] Mobile Navigation funktioniert
[ ] i18n-Wechsel funktioniert
[ ] Performance Budget eingehalten
```

Erst wenn alle Gates grün: **Freigabe erteilt.**

---

## Freigabe-Dokumentation

```yaml
freigabe:
  datum: ""
  version: ""
  
  gates:
    lighthouse_performance: 0
    lighthouse_accessibility: 0
    lighthouse_best_practices: 0
    lighthouse_seo: 0
    axe_violations: 0
    typescript_errors: 0
    biome_errors: 0
  
  bekannte_limitierungen: []
  
  naechste_iteration: []
  
  freigegeben_von: "Creative Director Review"
```
