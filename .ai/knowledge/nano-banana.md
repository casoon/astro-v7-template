# KI-Bildgenerierung — Prompt-Patterns

## Zweck

Diese Datei beschreibt Prompt-Patterns für markenkonsistente KI-Bilder. Nutze das verfügbare Bildmodell und passe Tool-spezifische Parameter nur an, wenn sie im Projekt tatsächlich verfügbar sind.

## Prompt-Struktur

```
[QUALITÄT] [STIL] [SUBJEKT] [KOMPOSITION] [LICHT] [FARBE] [TECHNISCH] [AVOID]
```

## Stil-Katalog

### Photorealistisch / Editorial

```
Ultra-high quality editorial photography, shot on Phase One medium format,
natural ambient light, [Tageszeit]-Lichtstimmung,
authentic and candid moment, documentary feel,
shallow depth of field, 85mm equivalent,
no artificial lighting, no studio backdrop
```

### Architekturfotografie

```
Architectural photography, ultra-sharp,
clean lines and geometric composition,
overcast soft diffused light (ideal for architecture),
shot on tilt-shift lens for perspective correction,
minimalist composition, negative space,
color-graded: [Markenfarben]-adjacent tones
```

### Portraitfotografie

```
Professional portrait photography, natural window light,
authentic expression, not posed or stiff,
environmental portrait in [Umgebung],
85mm f/1.8 equivalent, slight background blur,
skin tones: natural, not retouched artificially,
color temperature: [warm/neutral/cool]
```

### Product & Tech

```
High-end product photography,
studio lighting: [single key / three-point / ring light],
clean white or gradient background,
sharp focus on product, specular highlights,
color: pure and accurate to [Produktfarben],
format: square, suitable for e-commerce
```

### Lifestyle / Emotional

```
Lifestyle photography, golden hour light,
genuine human emotion, [positive Stimmung],
natural environment: [Umgebung],
candid moment, no direct eye contact with camera,
color temperature: warm (3200-4000K),
grain: subtle film grain for authenticity
```

## Marken-spezifische Anpassungen

Binde immer die Creative Direction aus Phase 2 ein:

```
Color harmony: photograph should complement these brand colors:
  Primary: [aus Phase 2, als Beschreibung, z.B. "deep navy blue"]
  Secondary: [z.B. "warm off-white"]
  Accent: [z.B. "vibrant coral"]

Visual Tone: [aus Phase 2, z.B. "professional but approachable"]
Brand Personality: [aus Phase 2, z.B. "innovative, trustworthy, human"]
```

## Prompts nach Verwendungszweck

### Hero-Bild (Startseite)

```
Ultra-high quality editorial photograph.

Scene: [konkrete Situation, kein abstrakter Stock-Ansatz]
Example: "A small team of three people collaborating around a laptop in a 
modern co-working space in Hamburg, engaged in genuine discussion"

Technical:
- Camera: 24-35mm wide angle, f/4
- Light: soft natural light from large windows, late afternoon
- Depth: medium depth of field, environment visible
- Colors: complement brand palette (deep navy, warm white, coral accent)

Mood: energetic yet focused, authentic, optimistic

High resolution, 16:9 ratio, editorial magazine quality
Avoid: stock photo clichés, fake smiles, overly staged setups,
       logos or text in image, corporate clichés
```

### About-Seite / Team

```
Authentic environmental portrait series.

Subject: [Beschreibung der Person / des Teams]
Setting: [Arbeitsumgebung, die zur Marke passt]
Expression: [engaged, focused, approachable] — never posed or forced
Attire: [passt zur Marken-Tonalität]

Photography style: Editorial portrait, modern business magazine quality
Light: Natural window light, soft shadows, no harsh flash
Lens: 85mm portrait, f/2.0, background gently blurred
Editing: Natural skin tones, subtle contrast, no heavy filters

Color: Harmonizes with [Markenfarben]
```

### Feature / Konzept-Bild

```
Conceptual illustration-style photograph.

Concept: [das abstrakte Konzept visuell darstellen]
Visual metaphor: [konkrete, fotografierbare Metapher dafür]

Example für "Datensicherheit":
"A close-up of hands carefully closing an old library book with brass clasps,
 warm reading room light, rich wooden textures"

Style: Cinematic still photography, high detail, meaningful composition
Format: 3:2 landscape, centered subject with contextual environment
Colors: [Markenfarben als Farbstimmung]

Avoid: Obvious clichés (padlocks for security, lightbulbs for ideas),
       computer screens, cheesy metaphors
```

### Blog-Cover

```
Editorial magazine cover photograph.

Topic: [Blog-Thema als konkrete visuelle Situation]
Composition: Rule of thirds, left-heavy (text area on right side)
Style: [Marken-Stil]
Light: [Lichtsituation]
Colors: [Markenfarben]

Technical: 16:9 ratio (1200x630px output), horizontal format,
           space for text overlay on [left/right/center]
           
High contrast in text area for legibility of overlay title
No existing text or logos in image
```

## Qualitätskontrolle

Nach der Generierung:

```
[ ] Stimmt die Farbstimmung mit den Brand Colors überein?
[ ] Ist der emotionale Eindruck wie geplant?
[ ] Kein Stock-Photo-Gefühl (Checkliste: echte Situation, keine Perfektion)
[ ] Kein Text im Bild
[ ] Können wir einen sinnvollen Alt-Text schreiben?
[ ] Dateiformat: WebP oder AVIF nach Konvertierung?
[ ] Dateigröße nach Optimierung im Budget?
[ ] Würde diese Bild die Scroll-Dramaturgie an dieser Stelle unterstützen?
```

## Iteration

Wenn ein Bild nicht passt:

```
1. Was genau passt nicht?
   [ ] Farbstimmung
   [ ] Komposition
   [ ] Emotionaler Eindruck
   [ ] Zu sehr Stock-Photo
   [ ] Falsche Perspektive

2. Welche Prompt-Elemente anpassen?

3. Maximal 3 Iterationen pro Bild.
   Wenn nach 3 Versuchen kein Ergebnis: andere Bildmetapher wählen.
```

## Integration in Higgsfield (zukünftig)

Das Bildmodell erzeugt Standbilder. Für Video nur einsetzen, wenn ein separates Motion-Tool verfügbar und freigegeben ist:

```
Geplant:
- Statisches Bild als Basis
- Video-Prompt für Motion (Higgsfield)
- Output: 2-4 Sekunden Loop für Hero-Background

Placeholder-Strategie bis zur Integration:
- Verwende Stills als Video-Poster
- CSS-Animation als Bewegungsersatz
```
