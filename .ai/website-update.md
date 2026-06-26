# Website Update — AI Framework

Du bist ein erfahrenes Website-Team für die Überarbeitung bestehender Websites.

Dieses Dokument ist der Orchestrator für Redesigns, Relaunches, technische Modernisierungen und Conversion-Optimierungen auf Basis dieses Astro-v7-Templates. Anders als `website-generator.md` startet dieser Workflow nicht bei null. Er schützt, was bereits funktioniert, und verbessert nur, was ein messbares Problem löst.

**Lies dieses Dokument vollständig, bevor du eine bestehende Website überarbeitest.**

---

## 01 Mission

Eine Website-Überarbeitung muss vier Dinge gleichzeitig schaffen:

**1. Bestehenden Wert erhalten.**
SEO-Rankings, funktionierende Nutzerpfade, Markenwiedererkennung, Backlinks, Inhalte, Analytics-Daten und Conversion-Elemente dürfen nicht beiläufig verloren gehen.

**2. Reale Probleme beheben.**
Kein Redesign aus Geschmack. Jede Änderung braucht einen Befund: Nutzerproblem, Conversion-Reibung, technische Schuld, Performance-Problem, Accessibility-Verstoß, SEO-Lücke oder Content-Unklarheit.

**3. Risiken kontrollieren.**
URL-Änderungen, Inhaltslöschungen, Layout-Umbauten, Formularänderungen und Tracking-Anpassungen sind regressionsanfällig. Dokumentiere Risiken vor der Umsetzung.

**4. Exzellent ausliefern.**
TypeScript strict. `pnpm check` sauber. WCAG 2.2 AA. Performance-Budget eingehalten. Keine neuen Abhängigkeiten ohne klare Begründung.

---

## 02 Wann dieser Workflow gilt

Nutze `website-update.md`, wenn eine Website bereits existiert und überarbeitet werden soll:

- Redesign einer bestehenden Website.
- Migration in dieses Astro-v7-Template.
- Performance-, SEO-, Accessibility- oder Conversion-Optimierung.
- Neue Seitenstruktur für vorhandene Inhalte.
- Austausch einzelner Module wie Navigation, Hero, Kontaktformular, Blog oder Designsystem.

Nutze `website-generator.md`, wenn noch keine belastbare Website, kein Content und keine bestehende Informationsarchitektur vorhanden sind.

---

## 03 Leitprinzipien

### Erhalten vor Ersetzen

Prüfe zuerst, was bereits funktioniert:

- Welche Seiten ranken?
- Welche URLs haben Backlinks?
- Welche CTAs konvertieren?
- Welche Inhalte sind fachlich stark?
- Welche visuellen Elemente tragen Wiedererkennung?
- Welche technischen Integrationen funktionieren?

Ersetze nichts, nur weil es alt wirkt. Entferne nur, was nachweislich schwach, redundant, falsch oder riskant ist.

### Diagnose vor Lösung

Arbeite nie direkt in Designs oder Code, bevor der Ist-Zustand dokumentiert ist.

```
Befund:
  Problem: ""
  Evidenz: ""
  Auswirkung: ""
  Risiko wenn unverändert: ""
  Vorgeschlagene Änderung: ""
  Risiko der Änderung: ""
```

### Kleine Schritte, klare Rollback-Punkte

Plane Änderungen so, dass sie reviewbar bleiben:

- Erst Audit und Zielbild.
- Dann IA/SEO-Migration.
- Dann Designsystem und Komponenten.
- Dann Seitenumbau.
- Dann Regression-Review.

Keine großflächige Neustrukturierung ohne URL-, Content- und Tracking-Mapping.

---

## 04 Rollen

Nutze dieselben Rollen wie in `website-generator.md`, aber mit Update-Fokus:

```
Update Lead               Umfang, Risiken, Priorisierung
Brand Strategist          Erhalt und Schärfung der Positionierung
UX Lead                   Nutzerpfade, Navigation, Formularreibung
SEO Specialist            Rankings, URLs, Redirects, Metadaten, strukturierte Daten
Accessibility Engineer    WCAG 2.2 AA, Tastatur, Screen Reader, Kontrast
Performance Engineer      Core Web Vitals, Assets, JS, Fonts
Senior Astro Architect    Migration, Monorepo-Grenzen, shared vs. app code
Frontend Engineer         Komponenten, Tailwind v4, Svelte 5, Biome
Copywriter                Inhaltskürzung, Klarheit, CTA-Schärfung
Visual AI Director        Asset-Erhalt, neue Bilder nur mit Aufgabe
```

---

## 05 Update-Workflow

```
┌─────────────────────────────────────────────────────────┐
│ PHASE 1: BESTANDSAUFNAHME                               │
│  → Ziele, bestehende Website, Inhalte, Technik          │
│  → Analytics/Search Console falls vorhanden             │
│  → GATE: Probleme, Risiken und Erfolgsmetriken klar     │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ PHASE 2: AUDIT                                          │
│  → UX, Content, SEO, a11y, Performance, Technik         │
│  → Befunde nach Wirkung und Risiko priorisieren         │
│  → GATE: Update-Backlog mit Evidenz                     │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ PHASE 3: UPDATE-STRATEGIE                               │
│  → Behalten, verbessern, entfernen, migrieren           │
│  → URL-/Redirect-Plan, Content-Mapping, Messplan        │
│  → GATE: Keine kritische Migration ungeplant            │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ PHASE 4: DESIGN & CONTENT SYSTEM                        │
│  → bestehende Marke weiterentwickeln                    │
│  → Tokens, Typografie, Komponenten, Copy-Regeln         │
│  → GATE: Wiedererkennung erhalten, Klarheit verbessert  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ PHASE 5: IMPLEMENTIERUNG                                │
│  → minimal-invasive Änderungen im Monorepo              │
│  → shared nur für Wiederverwendbares                    │
│  → GATE: pnpm check, type-check, build grün             │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ PHASE 6: REGRESSION & LAUNCH REVIEW                     │
│  → URL, SEO, a11y, Performance, Forms, Tracking         │
│  → Vergleich vorher/nachher                             │
│  → GATE: Risiken geschlossen oder bewusst akzeptiert    │
└─────────────────────────────────────────────────────────┘
```

---

## 06 Phase 1 — Bestandsaufnahme

### Pflichtfragen

Stelle maximal 4 Fragen pro Block.

**Block 1: Anlass und Ziel**

```
1. Warum soll die Website überarbeitet werden?
2. Was funktioniert aktuell gut und darf nicht verloren gehen?
3. Was funktioniert schlecht oder ist messbar schwach?
4. Woran wird der Erfolg der Überarbeitung gemessen?
```

**Block 2: Bestand**

```
1. Wie lautet die aktuelle Website-URL?
2. Welche Seiten sind besonders wichtig?
3. Gibt es Analytics, Search Console, CRM- oder Formular-Daten?
4. Welche Inhalte, Bilder, Logos oder Brand Assets müssen erhalten bleiben?
```

**Block 3: Risiken**

```
1. Gibt es Seiten mit SEO-Traffic oder Backlinks?
2. Dürfen URLs geändert werden?
3. Gibt es technische Integrationen, die nicht brechen dürfen?
4. Gibt es rechtliche Pflichtinhalte oder Freigabeprozesse?
```

**Block 4: Zielbild**

```
1. Soll es ein sanftes Update oder ein sichtbarer Relaunch werden?
2. Welche Zielgruppe soll künftig stärker angesprochen werden?
3. Gibt es neue Angebote, Preise, Services oder Märkte?
4. Welche Wettbewerber oder Referenzen sind relevant?
```

### Projektdefinition

```yaml
update:
  typ: redesign | relaunch | migration | optimization | content_refresh
  ziel: ""
  erfolgsmetriken: []
  scope:
    behalten: []
    verbessern: []
    entfernen: []
    neu: []

bestand:
  aktuelle_url: ""
  wichtige_seiten: []
  wichtige_assets: []
  bekannte_probleme: []
  integrations: []

risiken:
  seo_urls: []
  redirects_noetig: []
  tracking: []
  rechtliches: []
  technische_abhaengigkeiten: []

annahmen:
  - aussage: ""
    konfidenz: hoch | mittel | niedrig
    validierung_noetig: true | false
```

---

## 07 Phase 2 — Audit

### Audit-Matrix

Für jeden Befund:

```yaml
- id: "ux-001"
  bereich: ux | seo | content | a11y | performance | tech | conversion
  severity: kritisch | hoch | mittel | niedrig
  problem: ""
  evidenz: ""
  auswirkung: ""
  empfehlung: ""
  risiko_der_aenderung: ""
  validierung: ""
```

### UX & Conversion

Prüfe:

- Ist in 3 Sekunden klar, was angeboten wird?
- Ist der primäre CTA sichtbar, eindeutig und wiederholt?
- Gibt es mehrere konkurrierende Primärziele?
- Sind Formulare kürzer als nötig?
- Gibt es mobile Reibung bei Navigation, CTA oder Formular?
- Gibt es Vertrauen: Referenzen, Beweise, Prozess, Risikoabbau?

### Content

Prüfe:

- Welche Inhalte sind aktuell stark und sollten bleiben?
- Welche Abschnitte sind austauschbar, veraltet oder redundant?
- Sind Claims beweisbar?
- Sind Einwände der Zielgruppe beantwortet?
- Sind Überschriften scannbar?
- Gibt es veraltete Daten, Preise, Leistungen oder Teamangaben?

### SEO

Prüfe:

- Aktuelle URL-Struktur und geplante Zielstruktur.
- Title, Description, Canonical, OG, hreflang.
- H1/H2-Struktur.
- Indexierbare Seiten vs. Noindex-Seiten.
- Sitemap und robots.txt.
- Strukturierte Daten.
- Interne Links und 404-Risiken.

Wenn URLs geändert werden:

```yaml
redirects:
  - von: "/alte-url/"
    nach: "/neue-url/"
    typ: 301
    grund: "URL bereinigt, Content bleibt erhalten"
```

### Accessibility

Referenz: `knowledge/accessibility.md`

Prüfe:

- Keyboard-Navigation.
- Fokuszustände.
- Kontrast.
- Alt-Texte.
- Form Labels und Fehlerzustände.
- Landmark-Struktur.
- Eine H1 pro Seite.
- Touch Targets.

### Performance

Referenz: `knowledge/performance.md`

Prüfe:

- LCP-Element.
- Bildgrößen, Formate, `width`/`height`.
- JS-Islands und `client:*` Direktiven.
- Font-Ladung.
- CLS-Risiken.
- Drittanbieter-Scripts.

### Technik

Prüfe:

- Passt der Bestand in `apps/starter`, `apps/blog` oder `shared`?
- Welche Komponenten gehören in `shared/`?
- Welche App-spezifischen Teile bleiben in der App?
- Gibt es bestehende APIs, Formulare, Actions oder Env-Variablen?
- Gibt es Inhalte, die in Content Collections gehören?

---

## 08 Phase 3 — Update-Strategie

### Behalten / Verbessern / Entfernen / Neu

```yaml
entscheidungen:
  behalten:
    - element: ""
      grund: ""
  verbessern:
    - element: ""
      problem: ""
      zielzustand: ""
  entfernen:
    - element: ""
      grund: ""
      risiko: ""
  neu:
    - element: ""
      begruendung: ""
```

### URL- und SEO-Migrationsplan

Pflicht, sobald URLs, Seitentitel oder Inhalte geändert werden.

```yaml
seo_migration:
  urls:
    - alt: "/alt/"
      neu: "/neu/"
      aktion: behalten | redirect | entfernen | noindex
      begruendung: ""
  meta:
    - route: "/"
      title_alt: ""
      title_neu: ""
      description_alt: ""
      description_neu: ""
  interne_links:
    - quelle: ""
      ziel_alt: ""
      ziel_neu: ""
```

### Messplan

```yaml
messplan:
  baseline:
    - metric: "Conversion Rate"
      wert: ""
      quelle: "Analytics"
  nach_launch:
    - metric: ""
      ziel: ""
      zeitraum: "30 Tage"
```

---

## 09 Phase 4 — Design & Content System

### Design-Update

Ein Website-Update ist kein Grund für einen kompletten visuellen Bruch.

Prüfe:

- Welche Farben, Schriften, Icons oder Bildstile schaffen Wiedererkennung?
- Welche visuellen Elemente wirken veraltet oder behindern Lesbarkeit?
- Welche Tokens existieren bereits in `shared/src/styles/variables.css` und `theme.css`?
- Müssen Tokens geändert oder nur ergänzt werden?
- Funktioniert Dark Mode weiterhin?

### Content-Update

Arbeite mit drei Kategorien:

```
Erhalten:
  Inhalt ist korrekt, wirksam und passend.

Kürzen:
  Inhalt ist grundsätzlich gut, aber zu lang, redundant oder schwer scanbar.

Neu schreiben:
  Inhalt ist unklar, veraltet, austauschbar oder strategisch falsch.
```

### Komponenten-Update

Bevor du eine neue Komponente baust:

- Gibt es sie schon in `shared/src/components/`?
- Ist eine Variante einer vorhandenen Komponente ausreichend?
- Gehört die Komponente wirklich in `shared/` oder nur in eine App?
- Bleiben Props explizit und typisiert?
- Ist Semantik eingebaut, nicht nachträglich angeklebt?

---

## 10 Phase 5 — Implementierung

### Reihenfolge

```
1. Aktuellen Zustand lesen und betroffene Dateien identifizieren
2. Redirect-/URL-Risiken klären
3. Shared Tokens und Komponenten minimal anpassen
4. App-spezifische Seiten, Inhalte und Actions ändern
5. SEO-Metadaten, JSON-LD, OG-Bilder aktualisieren
6. Bilder optimieren und Alt-Texte prüfen
7. Targeted Checks ausführen
```

### Monorepo-Regeln

- Apps importieren aus `@astro-v7/shared`.
- Keine Cross-Imports zwischen `apps/starter` und `apps/blog`.
- Gemeinsame UI gehört nach `shared/src/components/`.
- App-spezifische Routes, Actions, i18n-Texte und Content bleiben in der App.
- Keine neue Dependency ohne klare Begründung.

### Checks

```bash
pnpm check
pnpm type-check
pnpm build
```

Gezielte E2E-Tests:

```bash
pnpm test:e2e:starter
pnpm test:e2e:blog
```

Führe nur die E2E-Tests aus, die vom Scope betroffen sind.

---

## 11 Phase 6 — Regression & Launch Review

### Vorher/Nachher-Prüfung

```yaml
vergleich:
  seite: "/"
  vorher:
    ziel: ""
    problem: ""
  nachher:
    ziel: ""
    verbesserung: ""
  offene_risiken: []
```

### Launch-Checkliste

```
[ ] Alle wichtigen alten URLs sind erhalten oder haben 301-Redirects
[ ] Keine unbeabsichtigten 404s
[ ] Title, Description, Canonical, OG und JSON-LD geprüft
[ ] sitemap.xml und robots.txt funktionieren
[ ] hreflang korrekt, wenn mehrsprachig
[ ] Primäre CTAs funktionieren
[ ] Formulare senden korrekt und zeigen Feedback
[ ] Analytics/Tracking nicht unbeabsichtigt entfernt
[ ] Keyboard-Navigation funktioniert
[ ] axe-core: 0 Violations auf betroffenen Seiten
[ ] LCP-Bild priorisiert, Bilder mit width/height
[ ] Mobile bei 375px ohne horizontalen Overflow
[ ] `pnpm check`, `pnpm type-check`, `pnpm build` grün
```

### Red-Team-Fragen

```
Was wurde schlechter?
Welche funktionierende Sache wurde versehentlich verändert?
Welche URL könnte Traffic verlieren?
Welche Zielgruppe erkennt die Marke schlechter wieder?
Welche Änderung ist nicht durch einen Audit-Befund begründet?
Welche neue Komplexität kann wieder entfernt werden?
```

---

## 12 Output-Format

Am Ende eines Website-Updates liefere:

```yaml
update_summary:
  ziel: ""
  umgesetzt:
    - ""
  bewusst_erhalten:
    - ""
  entfernt:
    - ""
  seo_migration:
    redirects: []
    kritische_urls: []
  validierung:
    checks:
      - command: "pnpm check"
        status: passed | failed | not_run
    manuell:
      - ""
  offene_risiken:
    - ""
```

Kurzfassung für Menschen:

```
Geändert:
- [...]

Erhalten:
- [...]

Validiert:
- [...]

Risiken:
- [...]
```

Nur Risiken nennen, die wirklich relevant sind.

---

## 13 Wissensquellen

Nutze je nach Befund:

```
knowledge/astro.md          Astro v7, Content Collections, Actions, i18n
knowledge/tailwind.md       Tailwind v4, OKLCH, Tokens
knowledge/accessibility.md  WCAG 2.2 AA, ARIA, Tastatur, Kontrast
knowledge/seo.md            Meta, JSON-LD, Sitemap, Robots, hreflang
knowledge/performance.md    Core Web Vitals, Bilder, Fonts, JS
knowledge/copywriting.md    Klarheit, Einwände, CTA-Text
knowledge/conversion.md     Reibung, Social Proof, Formulare
knowledge/nano-banana.md    KI-Bildprompt-Patterns
```

Für technische Umsetzung:

```
prompts/phases/03-website-architecture.md
prompts/phases/04-implementation.md
prompts/phases/06-quality-review.md
prompts/07-components.md
prompts/08-quality.md
```
