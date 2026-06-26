# Phase 1 — Projektinitialisierung

**Rolle:** Brand Strategist + UX Lead  
**Referenz:** `knowledge/seo.md`, `knowledge/copywriting.md`

---

## Ziel dieser Phase

Eine vollständige, validierte Projektdefinition, die alle folgenden Phasen fundiert.  
Kein Raten. Kein Annehmen. Kein Fortfahren bei Unklarheiten.

---

## Automatisches Interview

Führe das Interview durch, bevor du eine einzige Designentscheidung triffst.

Stelle diese Fragen — jeweils mit kurzem Kontext, warum die Antwort wichtig ist:

### Block 1: Grundlage

```
1. Was tut dieses Unternehmen / dieses Produkt?
   (In einem Satz, so wie du es einem Fremden erklären würdest.)

2. Wer ist der Auftraggeber?
   Name, Branche, Größe, Selbstbeschreibung.

3. Welches Template wird genutzt?
   [ ] starter  [ ] blog
   Warum dieses?

4. Was ist das Hauptziel der Website?
   (Leads generieren / Vertrauen aufbauen / Produkt verkaufen / Informieren / anderes)

5. Was ist der primäre Call to Action?
   (Was soll ein Besucher tun, nachdem er die Startseite gesehen hat?)
```

### Block 2: Zielgruppe

```
6. Wer ist die Zielgruppe?
   Beschreibe eine konkrete Person, nicht eine Demografie.
   (z.B. "Sarah, 38, HR-Leiterin in einem mittelständischen Unternehmen, frustriert von...")

7. Was ist das größte Problem dieser Person, das das Angebot löst?

8. Welche Einwände hat diese Person vor dem Kauf / Kontakt?
   (Mindestens 3 Einwände.)

9. Welche anderen Lösungen betrachtet diese Person?
   (Wettbewerber, Alternativen, Status quo.)

10. Was überzeugt sie letztendlich?
    (Das stärkste Argument für das Angebot.)
```

### Block 3: Marke & Differenzierung

```
11. Was macht dieses Angebot anders als alle Wettbewerber?
    (Kein Marketing-Speak. Was ist wirklich anders?)

12. Nenne drei Wettbewerber.
    Was machen sie gut? Was machen sie schlecht?

13. Wie soll sich die Website anfühlen?
    (Wähle 3-5 Adjektive: professionell, warm, minimalistisch, mutig, verspielt, ...)

14. Was darf die Website auf keinen Fall sein?
    (Gegenteilige Adjektive — mindestens 2.)

15. Gibt es visuelle Referenzen?
    (URLs, Screenshots, Beschreibungen von Websites, die gut gefallen.)
```

### Block 4: Inhalt & Struktur

```
16. Welche Seiten soll die Website haben?
    (Liste alle — auch wenn noch unklar.)

17. Welche Inhalte existieren bereits?
    (Texte, Bilder, Logo, Markenfarben, ...)

18. Welche Sprachen?
    [ ] Nur Deutsch  [ ] Nur Englisch  [ ] Deutsch + Englisch  [ ] andere: ___

19. Gibt es technische Einschränkungen oder Anforderungen?
    (CMS, Integrationen, Formulare, Login, ...)

20. Was ist der Zeitrahmen?
    Wann muss die Website online sein?
```

### Block 5: Erfolgsmetriken

```
21. Woran erkennst du, dass die Website erfolgreich ist?
    (Konkrete Metriken: X Anfragen/Monat, Y% Conversion, ...)

22. Wie wird der Traffic kommen?
    [ ] SEO  [ ] Paid  [ ] Social  [ ] Direkt  [ ] Empfehlungen

23. Gibt es ein Budget für Redesigns oder laufende Pflege?
```

---

## Annahmen dokumentieren

Für jede Frage, die nicht beantwortet wird, notiere eine explizite Annahme:

```yaml
annahmen:
  - frage: "Hauptziel der Website"
    annahme: "Lead-Generierung via Kontaktformular"
    konfidenz: mittel
    validierung: "Bitte bestätigen"
  
  - frage: "Wettbewerber"
    annahme: "Recherche basiert auf Branchenstandards"
    konfidenz: niedrig
    validierung: "Wettbewerber-URLs benötigt"
```

---

## Wettbewerber-Recherche

Analysiere die genannten Wettbewerber nach diesem Schema:

```
Wettbewerber: [Name]
URL: [url]

Stärken:
- [konkrete Stärke]
- [konkrete Stärke]

Schwächen:
- [konkrete Schwäche]
- [konkrete Schwäche]

Design-Muster:
- [auffälliges Muster]

Differenzierungspotenzial:
- [Wie kann unser Projekt besser sein?]
```

---

## Projektdefinition (YAML-Output)

Am Ende dieser Phase erzeugst du eine vollständige Projektdefinition:

```yaml
projekt:
  name: ""
  template: starter | blog
  sprachen: [de, en]
  
  auftraggeber:
    name: ""
    branche: ""
    beschreibung: ""

  ziel:
    primaer: ""
    cta: ""
    metriken: []

  zielgruppe:
    persona: ""
    groesstes_problem: ""
    einwaende: []
    entscheidungsfaktor: ""

  marke:
    differenzierung: ""
    adjektive: []
    tabu: []
    referenzen: []

  inhalt:
    seiten: []
    sprachen: []
    vorhanden: []
    fehlend: []

  wettbewerber:
    - name: ""
      url: ""
      staerken: []
      schwaechen: []

  annahmen: []
  
  naechster_schritt: "→ Phase 2: Creative Direction"
```

---

## Validierung

Vor dem Fortfahren zu Phase 2 prüfe:

- [ ] Zielgruppe als konkrete Person beschrieben (keine Demografie)
- [ ] Mindestens 3 Einwände dokumentiert
- [ ] Mindestens 2 Wettbewerber analysiert
- [ ] Differenzierung klar und nicht austauschbar
- [ ] Primärer CTA definiert
- [ ] Erfolgsmetriken messbar
- [ ] Alle Annahmen explizit dokumentiert

Fehlt ein Punkt: **Stelle die fehlende Frage. Fahre nicht fort.**
