# 06 — UX, Layout & Informationsarchitektur

**Input:** Brand Foundation, Copywriting, Bildstrategie  
**Rollen:** UX Lead, UI Designer, Senior Astro Architect  
**Referenz:** knowledge/tailwind.md, knowledge/accessibility.md

---

## Schritt 1: Informationsarchitektur

### Seiten-Inventar

Alle Seiten definieren bevor eine Zeile Code geschrieben wird.

```yaml
seiten:
  - route: "/"
    meta_title: ""           # max 60 Zeichen, Focus Keyword enthalten
    meta_description: ""     # max 160 Zeichen, Call to Action enthalten
    primaeres_ziel: ""       # Das eine Ding das der Nutzer tun soll
    primaerer_cta: ""        # Exakter CTA-Text
    sekundaerer_cta: ""      # Optional: zweites Angebot
    zielgruppe_segment: ""   # Wer kommt auf diese Seite?
    bewusstseinsstufe: ""    # problem-unbewusst | ... | kaufbereit
    json_ld: []              # Welche Schemas?
    abschnitte:
      - name: "Hero"
        aufgabe: "Sofortiger Relevanz-Check"
        conversion_beitrag: "Primärer CTA sichtbar"
      - name: "Problem"
        aufgabe: "Schmerzpunkt benennen, Empathie erzeugen"
        conversion_beitrag: "Nutzer fühlt sich verstanden → bleibt"
      # ...
```

### Navigationshierarchie

```yaml
navigation:
  primaer:
    - label: ""
      route: ""
      sichtbar_ab: ""        # immer | ab md | nur mobile
    - label: "[CTA in Nav]"
      route: ""
      stil: "highlight"       # primärer Button in der Navbar
  
  footer:
    spalte_1_marke:
      - logo
      - kurzbeschreibung: ""
      - social_links: []
    spalte_2_links:
      - label: ""
        route: ""
    spalte_3_legal:
      - Impressum
      - Datenschutz
```

### Nutzerpfade

Definiere die 3 wichtigsten Reisen durch die Website:

```
PFAD 1: [Nutzertyp — z.B. "Kaufbereiter Direktbesucher"]
  Kontext:    [Kommt direkt, kennt schon das Angebot, sucht Bestätigung]
  Route:      / → Kontakt
  Kritische Entscheidung: [Wo verliert man diesen Nutzer wenn die Website schlecht ist?]
  Optimierung: [Was macht die Konversion dieses Pfads wahrscheinlicher?]

PFAD 2: [Nutzertyp — z.B. "Skeptischer Rechercheur"]
  Kontext:    [Kommt über Google, vergleicht Anbieter]
  Route:      / → Features → Testimonials → Kontakt
  Kritische Entscheidung: [...]
  Optimierung: [...]

PFAD 3: [Nutzertyp — z.B. "Empfehlungsempfänger"]
  Kontext:    [Wurde empfohlen, Vertrauen schon teilweise vorhanden]
  Route:      / → Über uns → Kontakt
  Kritische Entscheidung: [...]
  Optimierung: [...]
```

---

## Schritt 2: Scroll-Dramaturgie (Startseite)

Detaillierter Plan für jeden Abschnitt:

```
┌─────────────────────────────────────────────────────────┐
│ HERO (0 – ~600px)                                       │
│                                                         │
│ Inhalt:    [Headline, Subline, CTA, Social Proof Zeile] │
│ Emotion:   Erkenntnis — "Genau das suche ich"           │
│ Bild:      [hero-startseite aus Bildmatrix]             │
│ Conversion: Primärer CTA above the fold                 │
│                                                         │
│ Layout-Optionen:                                        │
│   A. Bild rechts, Text links (klassisch)                │
│   B. Vollbild-Background, Text zentriert (dramatisch)   │
│   C. Text oben, Bild darunter (mobile-first)            │
│                                                         │
│ ENTSCHEIDUNG: [A/B/C] weil [Begründung]                │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ PROBLEM (nach Hero)                                     │
│                                                         │
│ Inhalt:    [Schmerzpunkte, die Zielgruppe fühlt sich    │
│             verstanden]                                 │
│ Emotion:   Empathie und Erleichterung                   │
│ Format:    [Text-Block / Liste / Cards / Statement]     │
│ Länge:     Kurz. 2-4 Elemente, nicht mehr.             │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ LÖSUNG (das Angebot)                                    │
│                                                         │
│ Inhalt:    [Nutzen, nicht Features. Was verändert sich?]│
│ Emotion:   Hoffnung, Klarheit                           │
│ Format:    [Feature-Grid / Prozess / Statement + Bild]  │
│ CTA:       Sekundärer CTA                               │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ BEWEIS                                                  │
│                                                         │
│ Inhalt:    [Testimonials, Zahlen, Logos, Case Studies]  │
│ Emotion:   Sicherheit, Bestätigung                      │
│ Format:    [Testimonial-Karten / Zähler / Quote]        │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ DETAILS (für Skeptiker)                                 │
│                                                         │
│ Inhalt:    [FAQ, Prozess, Features Detail, Preise]      │
│ Emotion:   Gewissheit, Kompetenz                        │
│ Format:    [Accordion FAQ / Timeline Prozess / Tabelle] │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ FINALE CONVERSION                                       │
│                                                         │
│ Inhalt:    [CTA + Risikominimierung + letzter Beweis]   │
│ Emotion:   Leichtigkeit, "Das kann ich tun"             │
│ Format:    [CTA-Block mit Background-Kontrast]          │
└─────────────────────────────────────────────────────────┘
```

---

## Schritt 3: Layout-Patterns

### Grid-System

```css
/* Haupt-Grid */
.section-grid {
  display: grid;
  grid-template-columns: [full-start] 1fr [content-start] min(var(--container-xl), 100%) [content-end] 1fr [full-end];
}

/* Volle Breite (z.B. Hintergrundfarbe) */
.full-bleed {
  grid-column: full;
}

/* Inhalt zentriert */
.content {
  grid-column: content;
  padding-inline: var(--section-px);
}
```

### Container Queries — wann verwenden

```css
/* Card-Komponente: reagiert auf verfügbaren Platz, nicht Viewport */
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}

/* Verwende wenn:
   - Komponente erscheint in Sidebar UND Main (unterschiedliche Breiten)
   - Grid-Cards die sich je nach Platz anpassen sollen
   
   Verwende NICHT wenn:
   - Einfache Spalten-Änderung auf Seite (→ Media Queries bleiben besser)
*/
```

### Responsive Layout-Entscheidungen

```
Für jede Komponente:

MOBILE (< 640px):
  - Stacking: Alles vertikal
  - Navigation: Hamburger/Drawer
  - Bilder: Volle Breite
  - Touch-Targets: ≥ 44px

TABLET (640px - 1024px):
  - 2-spaltige Grids
  - Navigation: oft noch Hamburger oder reduziert
  
DESKTOP (> 1024px):
  - 3-4 spaltige Grids
  - Vollständige Navigation
  - Sidebar-Layouts möglich
```

---

## Schritt 4: Komponentenplan

```yaml
komponenten:
  ui_primitiv:
    - Button.astro
      varianten: [primary, secondary, ghost, link]
      groessen: [sm, md, lg]
      props: [href, type, disabled, variant, size]
      
    - Card.astro
      varianten: [default, bordered, elevated]
      slots: [header, content, footer]
      
    - Badge.astro
      varianten: [default, primary, success, warning, error]
      
    - Input.astro
      typen: [text, email, tel, textarea]
      props: [label, hint, error, required]

  layout:
    - Navbar.astro
      features: [logo, links, cta-button, mobile-toggle, language-switcher, theme-toggle]
      sticky: true
      
    - Footer.astro
      spalten: [marke, links, legal]
      
    - ThemeToggle.svelte
      client_directive: idle
      
    - LanguageSwitcher.astro

  seo:
    - PageSEO.astro
      pflichtfelder: [title, description, ogImage, canonical]
      optional: [noindex, jsonLd]

  sections:
    - Hero.astro
      varianten: [image-right, full-background, split]
      
    - Features.astro
      varianten: [grid-3, grid-2, list-with-image]
      
    - Testimonials.astro
      varianten: [cards, single-quote, carousel]
      
    - FAQ.astro
      varianten: [accordion, two-column]
      
    - CTA.astro
      varianten: [centered, split, full-width]
```

---

## Schritt 5: Nielsen-Heuristiken Anwendung

**Für die geplante Architektur prüfen:**

```
1. Sichtbarkeit des Systemstatus
   → Wo gibt es asynchrone Aktionen? (Formular-Submit, Ladezeiten)
   → Wie wird Feedback kommuniziert? (Spinner, Erfolgsmeldung, Fehler)

2. Übereinstimmung mit realer Welt
   → Sind alle Begriffe in der Sprache der Zielgruppe?
   → Sind Icons verständlich ohne Beschriftung?

3. Nutzerkontrolle und Freiheit
   → Gibt es Aktionen die rückgängig gemacht werden können?
   → Gibt es Modale? Haben sie klare Schließ-Optionen?

4. Konsistenz
   → Gleiche Interaktionen an gleichen Stellen?
   → Gleiche Begriffe für gleiche Dinge?

5. Fehlervermeidung
   → Welche Fehler können Nutzer beim Formular machen?
   → Wie verhindern wir sie? (Hints, Constraints, Validierung)

6. Wiedererkennung statt Erinnerung
   → Weiß der Nutzer immer wo er ist? (Breadcrumbs, aktive Navigation)
   → Sind Labels immer sichtbar (kein Placeholder statt Label)?

7. Flexibilität
   → Können erfahrene Nutzer Abkürzungen nehmen?
   → Können Einsteiger geführt werden?

8. Minimalismus
   → Gibt es Elemente die keinen Informationswert haben?
   → Jedes Element rechtfertigt seinen Platz.

9. Fehlerbehebung
   → Formulierungen von Fehlern auf Feldebene (nie nur "Fehler!")
   → Lösungsvorschlag enthalten (nicht nur Problem benennen)

10. Hilfe
    → Komplexe Felder mit Tooltip oder Hint versehen
    → FAQ für häufige Fragen
    → Kontaktmöglichkeit immer erreichbar
```

---

## Schritt 6: Dark Mode Layout-Entscheidungen

```css
/* Für jede Layoutentscheidung: Dark Mode mitdenken */

/* Surfaces */
/* Light: weiß, helles Grau */
/* Dark: dunkelgrau, fast schwarz (NICHT schwarz — zu hart) */

/* Schatten */
/* Light: subtile Drop Shadows */
/* Dark: keine Shadows (zu dunkel), stattdessen Borders oder erhöhte Flächen */

/* Bilder */
/* Manche Bilder sehen in Dark Mode seltsam aus → Opazität leicht reduzieren */
.dark img.illustration {
  opacity: 0.85;
}
```

---

## Output dieser Phase

```yaml
ia_und_layout:
  seiten_inventar: []
  navigation: {}
  nutzerpfade: []
  
  scroll_dramaturgie:
    hero: {}
    problem: {}
    loesung: {}
    beweis: {}
    details: {}
    cta_final: {}
    
  komponentenplan: []
  
  nielsen_pruefung:
    offene_punkte: []
    loesungen: []

naechster_schritt: "→ prompts/07-components.md"
```
