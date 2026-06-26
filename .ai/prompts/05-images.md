# 05 — Bildstrategie & KI-Bildprompts

**Input:** Brand Foundation, Creative Direction  
**Rollen:** Visual AI Director, Creative Director  
**Referenz:** knowledge/nano-banana.md

---

## Schritt 1: Bildstrategie definieren

Bevor ein einziges Bild generiert wird, wird die Strategie definiert.

### Visuelle Persönlichkeit

```
Abgeleitet aus der Brand Personality (prompts/03-branding.md):

Bildstil:         [z.B. editorial, dokumentarisch, minimalistisch, warm]
Farbstimmung:     [Komplementäre zur Brand-Palette — als Adjektive]
Lichtstimmung:    [z.B. natürlich-warm, diffus-kühl, dramatisch-kontrastig]
Perspektive:      [z.B. nah/persönlich, weit/dokumentarisch, Vogelperspektive]
Menschenbild:     [z.B. authentisch-candid, professionell-posed, gar keine Menschen]
Vermeiden:        [z.B. Stock-Photo-Look, übersättigte Farben, übertriebene Perfektion]
```

### Bilder sind Argumente

Jedes Bild kommuniziert:
- Wer ist die Zielgruppe? (Wiedererkennung)
- Welche Qualität haben wir? (Vertrauen)
- Was ist die Stimmung der Marke? (Emotion)
- Warum sind wir anders? (Differenzierung)

Ein Bild das nichts davon tut, hat keinen Platz auf der Website.

---

## Schritt 2: Bildmatrix — alle Bilder dokumentieren

```yaml
bilder:
  - id: "hero-startseite"
    seite: "/"
    position: "Hero, oberhalb des Folds"
    aufgabe: "Sofortiger emotionaler Eindruck der Marke"
    emotion: "[z.B. Vertrauen + Energie]"
    beschreibung: "[Was ist zu sehen — konkret, nicht abstrakt]"
    stil: "[aus visueller Persönlichkeit]"
    farbraum: "[Komplementär zu --color-primary: ...]"
    dimensionen: "1920x1080"
    format: "WebP"
    loading: "eager"
    fetchpriority: "high"
    alt: "[Vollständiger, beschreibender Alt-Text]"
    nano_banana_prompt: ""  # wird in Schritt 3 entwickelt

  - id: "about-team"
    seite: "/ueber-uns"
    position: "Team-Sektion"
    aufgabe: "Vertrauen durch Gesichter und Persönlichkeit"
    emotion: "[z.B. Menschlichkeit + Kompetenz]"
    beschreibung: "[...]"
    dimensionen: "800x800"
    format: "WebP"
    loading: "lazy"
    alt: "[...]"
    image_prompt: ""
    
  # ... alle weiteren Bilder
```

---

## Schritt 3: KI-Bildprompt-Entwicklung

Für jedes Bild in der Matrix.

### Prompt-Baukasten

```
[QUALITÄT]
ultra-high quality [art direction style] photography,
shot on [Kamera — z.B. "Phase One medium format", "Sony A7R V", "Hasselblad X2D"]

[STIL]
[Stilbeschreibung — aus visueller Persönlichkeit]

[SUBJEKT]
[Konkrete Person/Situation — NIEMALS abstrakt]
Beispiel statt: "a business meeting"
Besser:         "a small team of three people in their late 30s, reviewing a 
                printed floor plan spread on a wooden table in a bright Hamburg office"

[UMGEBUNG]
[Konkrete Umgebung mit Details]

[LICHT]
[Lichtsituation]
natural window light from the left / golden hour warm sunlight through glass /
overcast soft diffused light / warm tungsten interior light

[KAMERA]
[Technische Parameter]
[Brennweite] equivalent / [Blende] / [Tiefenschärfe]
z.B.: 85mm portrait lens, f/1.8, shallow depth of field, subject sharp background gently blurred

[FARBE]
color harmony: the photograph should complement these brand colors:
primary color feel: [Beschreibung der Primärfarbe als Wort, z.B. "deep navy blue"]
avoid competing colors: [was vermieden wird]

[QUALITÄT]
high resolution, no watermarks, no text in image, no logos,
professional editorial quality

[AVOID]
stock photo clichés, fake smiles, [projektspezifische Vermeidungen],
oversaturated colors, heavy filters, AI artifact looks
```

### Vollständige Prompt-Templates nach Typ

**Hero-Bild:**
```
Ultra-high quality editorial photography, shot on Phase One medium format.

[Stil-Statement aus Brand Personality]

Scene: [Konkrete Situation, keine Metaphern]
People: [Beschreibung der Menschen — natürlich, nicht gestellt]
Environment: [Umgebung mit Detail]
Lighting: [Lichtsituation]
Camera: [Kamera-Setup]
Mood: [Emotionale Stimmung]

Color: warm tones with [Brand-Color-Adjektive],
subtle color grading complementing [Primärfarbe als Beschreibung]

Technical: high resolution, 16:9 format suitable for 1920x1080px,
photorealistic, no watermarks, no text

Avoid: [Liste aus Brand Personality + generische Stock-Photo-Elemente]
```

**Portrait / Team:**
```
Professional environmental portrait photography.

Subject: [Konkrete Person — Alter, Typ, Haltung]
Occupation: [Beruf/Kontext]
Setting: [Umgebung — passt zur Marke]
Expression: [Ausdruck — authentisch, spezifisch, nicht "smiling"]
Attire: [Kleidung — passt zur Tonalität]

Photography: 85mm portrait lens, f/2.0, natural window light from [Seite],
shallow depth of field, environment visible and in focus at reduced clarity

Skin tones: natural, not heavily retouched
Color: complementary to brand palette ([Brand Colors als Adjektive])

Style: editorial business portrait, genuine moment not posed setup
Avoid: fake smile, corporate stiffness, grey seamless background, stock photo poses
```

**Feature / Konzept:**
```
Conceptual editorial photograph for a feature about [Konzept].

Instead of the obvious cliché ([Klischee beschreiben]),
show this visual metaphor: [Konkrete, fotografierbare Alternative]

Example: Instead of "padlock for security" →
"a craftsman carefully closing an old carved wooden box with brass hinges,
warm workshop light, detailed wood grain texture, hands in focus"

Style: [Markenstil]
Format: 3:2 landscape, space for text if needed on [left/right]
Colors: [Brand Colors als Adjektive]

Technical: sharp focus, meaningful composition, rule of thirds
Avoid: obvious clichés ([benenne was konkret vermieden werden soll])
```

**Blog-Cover:**
```
Editorial magazine cover photograph for an article about: "[Thema]"

Concept: [Thema als konkrete, visuell darstellbare Situation]

Layout requirements:
  - 16:9 format (1200x630px output)
  - Space for text overlay on [left/right/center]
  - High contrast area where text will appear

Style: [Markenstil]
Lighting: [Lichtsituation]
Colors: [Brand Colors] — photograph should work with text overlay in these colors

Technical: professional quality, no existing text or logos in image,
photorealistic, suitable for web use
```

---

## Schritt 4: Qualitätskontrolle generierter Bilder

Jedes generierte Bild wird geprüft:

```
[ ] Transportiert das Bild die Brand Personality aus Phase 2?
[ ] Stimmt die Farbstimmung mit den Brand Colors überein?
[ ] Passt die Emotion zum Abschnitt in der Scroll-Dramaturgie?
[ ] Kein Stock-Photo-Gefühl?
    (Test: "Hat dieses Bild ein Wasserzeichen" — wenn es so aussieht: neu generieren)
[ ] Kein Text, kein Logo im Bild?
[ ] Kann ich einen beschreibenden Alt-Text schreiben?
    (Wenn nicht: Bild zu abstrakt oder zu dekorativ → überdenken)
[ ] Ist das Bild kompositorisch für den vorgesehenen Zweck richtig?
    (Hero: Platz für Text-Overlay? Portrait: richtige Proportionen?)
```

### Iterations-Protokoll

```
Bild-ID: [...]
Versuch 1:
  Prompt-Version: [...]
  Problem: [Was passt nicht?]
  → Anpassung: [Was ändere ich am Prompt?]

Versuch 2:
  Prompt-Version: [...]
  Problem: [...]
  → Anpassung: [...]

Versuch 3:
  Entscheidung: [Verwenden / Alternative Bildmetapher wählen]
```

**Maximal 3 Versuche pro Bild.** Nach 3 Versuchen: andere Bildmetapher, neu anfangen.

---

## Schritt 5: Bild-Optimierung

### Workflow

```
1. Bild generiert oder vorhandenes Asset ausgewählt
2. Format prüfen: Originalgröße ausreichend für vorgesehene Dimension?
3. Konvertieren: → WebP (Basis) + AVIF (wenn Browser-Support gewünscht)
4. Komprimieren: WebP quality 85, AVIF quality 80
5. Dimensionen: Nicht größer als 2× Display-Größe
6. Ablegen: src/assets/ (für Astro Image Optimization) oder public/images/
7. Astro <Image> Component verwenden
```

### Dimensionen-Referenz

```
Verwendung          Dimension         Komprimiert (Ziel)
─────────────────────────────────────────────────────────
Hero (Full)         1920×1080 px      150-200 KB WebP
Hero (Mobile)        768×432 px       50-80 KB WebP
Feature-Bild         800×600 px       50-80 KB WebP
Blog-Cover          1200×630 px       80-120 KB WebP
Team-Portrait        600×600 px       40-60 KB WebP
OG Image            1200×630 px       150-250 KB PNG (text-lesbar)
Thumbnail            400×300 px       20-30 KB WebP
```

### Astro Image Component

```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/hero.webp';
---

<!-- Hero: eager + fetchpriority -->
<Image
  src={heroImg}
  alt="[Alt-Text aus Bildmatrix]"
  width={1920}
  height={1080}
  format="webp"
  quality={85}
  loading="eager"
  fetchpriority="high"
/>

<!-- Alle anderen: lazy -->
<Image
  src={featureImg}
  alt="[Alt-Text aus Bildmatrix]"
  width={800}
  height={600}
  format="webp"
  quality={85}
  loading="lazy"
/>
```

---

## Schritt 6: OG Images

```typescript
// scripts/generate-og.ts läuft vor astro build
// Konfiguration → Satori (HTML→SVG) + @resvg/resvg-js (SVG→PNG)

// Design-Anforderungen für OG Images:
// 1200×630px PNG
// Brand Colors aus Token-System
// Titel + Logo
// Sauber lesbar auch wenn klein dargestellt
// Kein Gradient der Lesbarkeit beeinträchtigt
```

---

## Output dieser Phase

```yaml
bildstrategie:
  visueller_stil: ""
  farbstimmung: ""
  lichtstimmung: ""
  vermeidungen: []
  
  bildmatrix:
    - id: ""
      seite: ""
      alt: ""
      loading: eager | lazy
      dimensionen: ""
      nano_banana_prompt: ""
      status: geplant | generiert | optimiert | final

naechster_schritt: "→ prompts/06-layout.md"
```
