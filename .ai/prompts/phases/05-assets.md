# Phase 5 — Assets & Bildstrategie

**Rolle:** Visual AI Director + Creative Director  
**Referenz:** `knowledge/nano-banana.md`, `knowledge/performance.md`  
**Input:** Creative Direction aus Phase 2

---

## Bildstrategie

Bilder sind keine Dekoration. Jedes Bild hat eine inhaltliche Aufgabe.

### Bildmatrix — Pflichtdokument

Definiere für jedes Bild auf der Website:

```yaml
bilder:
  - id: "hero-main"
    seite: "/"
    position: "Hero, über dem Fold"
    aufgabe: "Sofortiger emotionaler Eindruck, Zielgruppen-Identifikation"
    stil: "Authentisch, kein Stock Photo Look"
    inhalt: "[Beschreibung: Was ist zu sehen?]"
    farbraum: "Warm, passt zu --color-primary"
    format: "WebP, 1920x1080"
    loading: "eager"
    alt: "[Beschreibender Alt-Text]"

  - id: "about-team"
    seite: "/ueber-uns"
    position: "Team-Sektion"
    aufgabe: "Vertrauen durch Gesichter aufbauen"
    stil: "Professionell aber menschlich"
    inhalt: "[Beschreibung]"
    format: "WebP, 800x800"
    loading: "lazy"
    alt: "[Beschreibender Alt-Text]"
```

---

## KI-Bildgenerierung

Referenz: `knowledge/nano-banana.md`. Nutze das verfügbare Bildmodell; die Prompt-Struktur ist wichtiger als der Toolname.

### Prompt-Struktur

Jeder Bildprompt folgt diesem Schema:

```
[STIL] [SUBJEKT] [AKTION/ZUSTAND] [UMGEBUNG] [LICHTSTIMMUNG] [KAMERA] [ZUSATZ]
```

### Stil-Definitionen nach Markentyp

#### Professionell & Vertrauenswürdig
```
photorealistic, professional photography, natural lighting,
shallow depth of field, 85mm portrait lens,
clean modern environment, warm neutral tones,
authentic candid moment, high resolution
```

#### Technisch & Innovativ
```
ultra-sharp product photography, studio lighting setup,
technology context, blue-tinted highlights,
precision and detail, isometric perspective possible,
minimal background, professional grade
```

#### Warm & Menschlich
```
lifestyle photography, golden hour light,
natural environment, human connection,
candid moment, documentary style,
genuine emotion, editorial quality
```

#### Minimalistisch & Premium
```
fine art photography, moody atmosphere,
architectural composition, dramatic shadows,
high contrast monochromatic option,
editorial fashion magazine quality,
negative space, precise geometry
```

### Prompt-Templates

#### Hero-Bild

```
[STIL für Marke]

Main subject: [Beschreibung der Person/Situation]
doing: [Tätigkeit]
in: [Umgebung]

Lighting: [Lichtsituation]
Camera: [Kamera-Setup]
Mood: [emotionale Stimmung]
Colors: [Farbpalette, passend zu Brand-Colors aus Phase 2]

Technical: photorealistic, high resolution, sharp focus,
no watermarks, no text, professional quality

Avoid: stock photo clichés, fake smiles, generic office,
oversaturated colors
```

#### Team / Person

```
Professional portrait of [Beschreibung]
Occupation: [Beruf/Rolle]
Setting: [Umgebung]
Expression: [Ausdruck — authentisch, nicht gestellt]
Attire: [Kleidung passend zur Marke]

Lighting: [Lichtsituation]
Camera: 85mm portrait lens, shallow depth of field
Post-processing: subtle, natural skin tones

Style: [Markenstil]
Colors: complementary to [Brand-Farben]
```

#### Feature / Illustration

```
[Konzept] represented as [visuelle Metapher]
Style: [Stil]
Color palette: [2-3 Farben aus dem Token-System]
Composition: [z.B. centered, rule of thirds, diagonal]
Background: [clean / textured / gradient]

Technical: vector-like clarity, scalable aesthetic,
consistent with brand visual language
Avoid: clipart look, overly complex, text in image
```

### Qualitätskriterien für generierte Bilder

Prüfe jedes Bild auf:

```
[ ] Passt zur Brand Personality aus Phase 2?
[ ] Emotionale Wirkung trifft die Scroll-Dramaturgie?
[ ] Farbstimmung harmoniert mit dem Token-System?
[ ] Kein Stock-Photo-Eindruck?
[ ] Alt-Text beschreibbar (nicht "KI-generiertes Bild")?
[ ] Format: WebP oder AVIF?
[ ] Dateigröße unter 200kb nach Optimierung?
[ ] Keine Texte im Bild?
```

---

## Bildoptimierung

### Workflow

```
1. Bild generieren oder vorhandenes Asset nutzen
2. Größe prüfen: Originalgröße für Format ausreichend?
3. Format konvertieren: → WebP (Basis) + AVIF (modern)
4. Komprimieren: WebP quality 85, AVIF quality 80
5. Dimensionen prüfen: Max 2x Display-Größe
6. In public/images/ oder src/assets/ ablegen
7. Lazy Loading für Bilder unter dem Fold
8. Astro <Image> Component verwenden
```

### Größen-Matrix

```
Hero (Full Width):    1920x1080 → WebP ~150-200kb
Hero (Mobile):         768x432  → WebP ~60-80kb
Feature-Bild:          800x600  → WebP ~50-80kb
Team-Portrait:         600x600  → WebP ~40-60kb
Blog-Cover:           1200x630  → WebP ~100-150kb
OG Image:             1200x630  → PNG (scharf, Text lesbar)
Thumbnail:             400x300  → WebP ~20-30kb
```

---

## Video-Strategie (optional)

Wenn Video eingesetzt wird:

```yaml
video:
  typ: "background-loop | explainer | testimonial | product-demo"
  
  technisch:
    format: "MP4 (H.264 + H.265) + WebM (VP9)"
    autoplay: true   # nur wenn muted + loop
    muted: true      # Pflicht für Autoplay
    loop: true
    preload: "metadata"  # nicht auto
    poster: "video-placeholder.webp"  # immer setzen
    
  accessibility:
    - "Kein autoplay ohne muted"
    - "Pause-Button immer sichtbar"
    - "Kein flackerndes Content (Epilepsie)"
    - "Untertitel für Testimonials"
    
  performance:
    - "< 5MB für Background Loops"
    - "Lazy load für Videos unter dem Fold"
    - "IntersectionObserver für Autoplay-Trigger"
```

---

## Social Media Assets

Generiere aus dem Token-System:

```
OG Images (automatisch via scripts/generate-og.ts):
  - Startseite: og-home.png
  - Kontakt: og-contact.png
  - Blogpost: og-[slug].png
  Format: 1200x630px
  
Twitter/X Cards:
  - summary_large_image
  - Gleiche Dimensionen wie OG

Favicon-Set:
  - favicon.ico (32x32)
  - favicon.svg (skalierbar, bevorzugt)
  - apple-touch-icon.png (180x180)
  - manifest icons: 192x192, 512x512
```

---

## Asset-Checkliste vor Phase 6

```
[ ] Hero-Bild(er) generiert und optimiert
[ ] Alt-Texte für alle Bilder dokumentiert
[ ] OG Images werden von scripts/generate-og.ts erzeugt
[ ] Favicon-Set vollständig
[ ] Alle Bilder in WebP konvertiert
[ ] Lighthouse: Keine unoptimierten Bilder (Warnung)
[ ] Social Media Sharing funktioniert (OG Debugger testen)
```
