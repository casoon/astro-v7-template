# 04 — Copywriting

**Input:** Brand Foundation (prompts/03-branding.md)  
**Rollen:** Copywriter, Conversion Specialist, Brand Strategist  
**Referenz:** knowledge/copywriting.md, knowledge/conversion.md

---

## Schritt 1: Persona-Vertiefung

Bevor ein Wort geschrieben wird, wird die Persona vollständig aktiviert.

```
Name der Persona: [aus Interview]
Aktuelle Situation: [konkreter Alltag]
Größtes Problem heute: [spezifischer Schmerz, ihre Worte]
Was sie sich wünscht: [konkreter Zustand nach der Lösung]

Wörter die SIE benutzt (nicht wir):
  Für ihr Problem: [...]
  Für ihre Lösung: [...]
  Für ihre Branche: [...]

Wörter die sie NICHT benutzt (aber viele Anbieter):
  [...]
```

**Regel:** Verwende die Worte der Persona, nicht die Worte der Branche.

---

## Schritt 2: Headline-Entwicklung

Für jede Seite / jeden Abschnitt: mindestens 3 Varianten, dann bewusste Entscheidung.

### Startseite — Hero Headline

```
KONTEXT: Zielgruppe, Ziel, Bewusstseinsstufe: [aus Interview]

VARIANTE A — Ergebnis-fokussiert:
"[Konkretes Ergebnis] in [Zeitraum/Bedingung]"
Stärke: [...]  Schwäche: [...]

VARIANTE B — Problem-fokussiert:
"[Schmerzpunkt der Persona], [Lösung]"
Stärke: [...]  Schwäche: [...]

VARIANTE C — Differenzierungs-fokussiert:
"[Was kein anderer bietet / wie wir es anders machen]"
Stärke: [...]  Schwäche: [...]

ENTSCHEIDUNG: Variante [X]
BEGRÜNDUNG: [Warum diese Variante für diese Persona, in diesem Kontext]

FINALE HEADLINE: "[Text]"
SUBLINE: "[1-2 Sätze. Klärt, für wen, warum jetzt, was passiert.]"
```

### Weitere Seiten und Abschnitte

Für jeden Abschnitt der Startseite + alle Unterseiten:

```
ABSCHNITT: [Hero / Features / Testimonials / CTA / FAQ / etc.]
AUFGABE: [Was muss dieser Abschnitt leisten?]
EMOTION: [Was soll der Leser fühlen?]
HEADLINE: "[Text]"
SUBLINE/INTRO: "[Text falls nötig]"
```

---

## Schritt 3: CTA-Texte

### Das CTA-Format

```
[VERB] + [NUTZEN/ERGEBNIS] (max. 5 Wörter)

✅ Starke CTAs:
"Kostenloses Erstgespräch buchen"
"Mein Projekt starten"
"14 Tage kostenlos testen"
"Jetzt Angebot anfordern"
"Demo ansehen"

❌ Schwache CTAs:
"Absenden"
"Klicken"
"Mehr erfahren" (ohne Kontext)
"Kontaktieren Sie uns"
"Weiter"
```

### CTA-Matrix (alle CTAs auf der Website)

```yaml
ctas:
  - seite: "/"
    position: "Hero"
    text: ""
    mikrokopie: ""      # z.B. "Kostenlos, kein Vertrag"
    ziel_url: ""
    conversion_ziel: ""

  - seite: "/"
    position: "Nach Testimonials"
    text: ""
    mikrokopie: ""
    
  - seite: "/contact/"
    position: "Formular Submit"
    text: ""
    mikrokopie: ""      # "Wir antworten innerhalb von 24 Stunden"
```

---

## Schritt 4: Nutzen statt Features

### Die Transformation-Formel

```
Feature:      "[Was das Produkt/Angebot hat oder tut]"
Bridge:       "Das bedeutet für dich:"
Nutzen:       "[Konkretes Ergebnis in der Welt des Nutzers]"
```

**Für jeden Feature-Punkt:**

```
Feature: [...]
Nutzen:  [...]
→ Formulierung: "[Nutzen, nicht Feature]"
```

### Nutzen-Hierarchie (von wirkungsvoll zu weniger wirkungsvoll)

```
1. Transformativer Nutzen:  "Du hast Freitagnachmittag Zeit für deine Familie."
2. Funktionaler Nutzen:     "Du sparst 3 Stunden Verwaltung pro Woche."
3. Emotionaler Nutzen:      "Du weißt, dass alles erledigt ist."
4. Feature-Nutzen:          "Automatische Berichte per E-Mail."
```

Ziel: Immer so weit oben in der Hierarchie wie ehrlich möglich.

---

## Schritt 5: Einwände entkräften

Für jeden dokumentierten Einwand aus dem Interview:

```
EINWAND 1: "[Aus Interview]"
  Entkräftungsansatz:
    [ ] Direkte Antwort (FAQ)
    [ ] Testimonial das diesen Einwand adressiert
    [ ] Garantie oder Risikoumkehr
    [ ] Soziale Bewährtheit ("X andere hatten dieselbe Sorge")
  
  Formulierung: "[Konkreter Text für die Website]"
  Platzierung: "[Wo auf der Website erscheint diese Entkräftung?]"

EINWAND 2: "[...]"
  [...]

EINWAND 3: "[...]"
  [...]
```

---

## Schritt 6: Social Proof Texte

### Testimonial-Format (wenn wir Testimonials erstellen/formulieren)

```
SCHWACH:
"Tolle Zusammenarbeit! Sehr empfehlenswert." — M.S., München

STARK:
"[Konkrete Situation vor dem Kauf]. [Was konkret passiert ist]. [Konkretes Ergebnis]."
— [Voller Name], [Titel], [Unternehmensname + Ort], [Kundenseit wann]

Beispiel:
"Wir hatten vorher 3 verschiedene Tools und trotzdem den Überblick verloren.
Nach 2 Wochen mit TaskFlow wusste das gesamte Team wo jedes Projekt steht.
Unsere Meetings sind 40% kürzer geworden."
— Sarah Kraft, CTO, Kleinwachter Digital GmbH Berlin, Kundin seit 2023
```

### Zahlen mit Kontext

```
SCHWACH: "Über 100 Kunden"
STARK:   "127 mittelständische Unternehmen in Hamburg und Umgebung seit 2018"

SCHWACH: "Top bewertet"
STARK:   "4,9 / 5 Sterne aus 84 verifizierten Google-Bewertungen (Stand: Juni 2025)"

SCHWACH: "Schnelle Lieferung"
STARK:   "Durchschnittlich 4,2 Wochen von Beauftragung bis Live-Gang"
```

---

## Schritt 7: Risikominimierung

Die Hürde vor dem letzten Klick senken:

```
Für den primären CTA:

Risiko-Identifikation:
  Was befürchtet die Persona im schlechtesten Fall? [...]

Risikoumkehr:
  [ ] Kostenlos testen / Geld-zurück-Garantie
  [ ] Kein Vertrag / Jederzeit kündbar
  [ ] Kostenloses Erstgespräch / Kostenvoranschlag
  [ ] Festpreis / Keine Überraschungen
  [ ] Direkte Ansprechperson / Kein Callcenter

Formulierung:
  "[Konkrete Risikominimierung als Mikro-Kopie unter dem CTA]"
  Maximal 1 Zeile. Konkret, nicht vage.
  
  ✅ "Kostenlos. Kein Vertrag. In 30 Minuten."
  ❌ "Risikofrei und unverbindlich."
```

---

## Schritt 8: SEO-Copywriting

Keywords natürlich integrieren — nie stuffed, nie forciert.

```
Focus Keyword (Seite): [...]
Sekundäre Keywords:    [...]

Platzierungsregeln:
  H1:         Focus Keyword enthalten (natürlich)
  Erste 100 Wörter: Focus Keyword einmal
  Subheadings: Sekundäre Keywords verteilt
  Alt-Texte:  Keyword wenn natürlich passend
  
Lesbarkeitstests:
  Klingt der Text mit Keywords noch natürlich? (laut vorlesen)
  Würde ein Mensch so schreiben? → Wenn nicht: umformulieren
```

---

## Reflection: Copy Review

```
Für jeden Text:

[ ] Kein Agentur-Deutsch (ganzheitlich, maßgeschneidert, auf Augenhöhe, ...)
[ ] Kein Passiv wo Aktiv möglich
[ ] Kein Nominalstil ("die Durchführung von" → "wir führen durch")
[ ] Nutzen statt Features
[ ] Laut vorgelesen: klingt wie ein Mensch?
[ ] Wettbewerber könnte das nicht 1:1 übernehmen?
[ ] Alle 3 Einwände beantwortet?
[ ] CTA-Text: Verb + Nutzen, max 5 Wörter?
[ ] Mikro-Kopie: konkrete Risikominimierung?
```

---

## Output dieser Phase

```yaml
copy:
  headlines:
    hero: ""
    subline: ""
    
  abschnitte:
    - name: ""
      headline: ""
      text: ""
      cta: ""
      
  ctas:
    - position: ""
      text: ""
      mikrokopie: ""
      
  nutzen_matrix:
    - feature: ""
      nutzen: ""
      formulierung: ""
      
  einwand_entkraeftung:
    - einwand: ""
      formulierung: ""
      platzierung: ""
      
  social_proof:
    testimonials: []
    zahlen: []
    
  risiko_minimierung:
    formulierung: ""

naechster_schritt: "→ prompts/05-images.md"
```
