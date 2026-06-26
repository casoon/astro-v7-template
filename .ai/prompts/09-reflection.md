# 09 — Reflection & Red Team

Diese Datei beschreibt die zwei kritischsten Kontrollmechanismen des Frameworks: den Reflection Loop und das Red Team. Beide sind Pflicht — kein Projekt verlässt das Framework ohne sie.

---

## Warum Reflection?

Ein Entwurf der sofort ausgegeben wird, ist fast nie der beste Entwurf. Reflection erzwingt eine zweite Denkebene: nicht "habe ich es umgesetzt" sondern "habe ich das Richtige umgesetzt".

Studien zu Large Language Models zeigen: Wenn explizit zur Selbstüberprüfung aufgefordert wird, verbessert sich die Qualität der Ausgaben messbar. Dieser Loop ist deshalb kein optionaler Kommentar, sondern ein inhärenter Teil des Denkprozesses.

---

## Reflection Loop — Vollständiges Protokoll

**Wann:** Nach jeder kreativen Phase. Immer bevor eine Ausgabe erzeugt wird.

**Format:** Beantworte alle 6 Fragen intern, dann entscheide, dann gib aus.

```
═══════════════════════════════════════════════════════════
REFLECTION LOOP
Thema: [Was wird gerade reflektiert?]
═══════════════════════════════════════════════════════════

FRAGE 1: IST DAS DIE BESTE LÖSUNG?
Was ich hergestellt habe: [kurze Beschreibung]
Was ein Creative Director mit 20 Jahren Erfahrung kritisieren würde:
  → [Konkrete Kritik — nicht "es ist gut", sondern was fehlt oder suboptimal ist]

FRAGE 2: WELCHE ALTERNATIVE WÄRE MUTIGER?
Variante die mehr riskiert: [Beschreibung]
Würde das Risiko sich lohnen? [Ja/Nein/Vielleicht — mit Begründung]

FRAGE 3: WELCHE ALTERNATIVE WÄRE EINFACHER?
80% der Wirkung mit 20% der Komplexität: [Beschreibung]
Verlieren wir dabei etwas Wesentliches? [Ja/Nein — mit Begründung]

FRAGE 4: WELCHE ALTERNATIVE WÄRE CONVERSIONSTÄRKER?
Was ein Conversion Specialist ändern würde: [konkret]
Warum würde es die Conversion verbessern? [Mechanismus]

FRAGE 5: WELCHE ALTERNATIVE WÄRE PERFORMANTER?
Was ein Performance Engineer weglassen oder vereinfachen würde: [konkret]
Performance-Gewinn vs. Wirkungsverlust: [Abwägung]

FRAGE 6: ENTSCHEIDUNG
Ich entscheide mich für: [aktuelle Version / Variante X]
Begründung: [Warum diese, für diese Zielgruppe, in diesem Kontext]
Verworfene Alternativen und Grund: [kurz]

═══════════════════════════════════════════════════════════
JETZT ERST: AUSGABE
═══════════════════════════════════════════════════════════
```

---

## Self-Consistency Protokoll

Für wichtige Entscheidungen: entwickle mehrere unabhängige Lösungswege, dann entscheide.

**Wann Self-Consistency anwenden:**
- Headline-Entwicklung (immer 3 Varianten)
- Farbentscheidungen (mindestens 2 Systeme vergleichen)
- CTA-Texte (mindestens 2 Varianten)
- Komponentenstruktur (wenn mehrere Ansätze möglich)

```
SELBSTKONSISTENZ-CHECK
Aufgabe: [Was soll entschieden werden?]

VARIANTE A:
  Lösung: [...]
  Stärken: [...]
  Schwächen: [...]
  Am besten für: [welcher Nutzertyp / welcher Kontext]

VARIANTE B:
  Lösung: [...]
  Stärken: [...]
  Schwächen: [...]
  Am besten für: [...]

VARIANTE C (optional):
  Lösung: [...]
  Stärken: [...]
  Schwächen: [...]
  Am besten für: [...]

ENTSCHEIDUNG:
  Gewählt: Variante [X]
  Begründung: [Nicht "ist besser", sondern warum für diese spezifische Situation]
  Kontext der Entscheidung: [Was macht diese Wahl richtig für dieses Projekt?]
```

---

## Red Team Protokoll

**Zweck:** Aktive Fehlersuche bevor der Nutzer sie findet. Du übernimmst die Perspektive eines skeptischen, kritischen Reviewers der absichtlich nach allem sucht, was schief gehen kann.

**Mindset:** Du bist nicht mehr der Designer. Du bist der Nutzer, der abspringt. Du bist der Wettbewerber, der überlegen ist. Du bist der Journalist, der einen kritischen Artikel schreibt.

### Red Team 1: Technisches Versagen

```
Szenario: JavaScript ist deaktiviert.
  → Was funktioniert noch? Was nicht?
  → Ist das akzeptabel? (Kern-Functionality: Ja. Nice-to-have: Ja. Alles bricht: Nein.)
  Test: Chrome DevTools → JavaScript deaktivieren → Seite öffnen

Szenario: Langsame Verbindung (3G simuliert).
  → Wie lange dauert der First Contentful Paint?
  → Sieht die Seite während des Ladens akzeptabel aus?
  Test: Chrome DevTools → Network → Fast 3G → Hard Reload

Szenario: Browser-Zoom 200%.
  → Gibt es horizontalen Overflow?
  → Überlappt sich Text?
  → Sind CTA-Buttons noch vollständig sichtbar?
  Test: Cmd+Plus bis 200%, dann alle Seiten prüfen

Szenario: Print-Ansicht.
  → Navigation ausgeblendet?
  → Farben druckbar?
  Test: Chrome → Print Preview
```

### Red Team 2: Inhaltliche Schwächen

```
Test: Wettbewerber-Übernahme
  Ersetze "wir" durch den stärksten Wettbewerber.
  Klingt es noch wahr? → Wenn ja: differenzieren.

Test: Glaubwürdigkeits-Check
  Gehe durch jeden Claim auf der Website.
  Gibt es Behauptungen ohne Beweis?
  → Entweder Beweis liefern oder Behauptung entfernen.

Test: Zielgruppen-Sprache
  Gehe durch jeden Satz im Hero und im Hauptabschnitt.
  Würde die Persona so reden? Versteht sie alle Begriffe?
  → Jargon ohne Erklärung → ersetzen oder erklären.

Test: Einwands-Check
  Liste die 3 dokumentierten Einwände.
  Für jeden: Wo genau auf der Website wird er beantwortet?
  → Wenn kein klarer Ort: Inhalt ergänzen.
```

### Red Team 3: Conversion-Versagen

```
Test: 3-Sekunden-Test
  Öffne die Startseite.
  Was siehst du in 3 Sekunden? (ohne zu lesen, nur zu schauen)
  → Ist der primäre CTA sofort erkennbar? Wenn nein: Hierarchie korrigieren.

Test: Pfad zum CTA
  Öffne die Startseite auf 375px.
  Wieviele Scrollgesten bis zum primären CTA?
  → Ziel: CTA ohne Scrollen sichtbar. Wenn nicht: Sticky CTA erwägen.

Test: Formular-Reibung
  Fülle das Kontaktformular aus als skeptischer Nutzer.
  → Gibt es Felder, die du nicht ausfüllen würdest? Warum?
  → Ist das Datenschutz-Hinweis vorhanden?
  → Was passiert nach dem Submit? Ist es klar?

Test: Mobile Conversion
  Öffne alle Seiten auf 375px.
  Sind alle CTAs vollständig sichtbar?
  Sind alle Touch-Targets groß genug?
  Gibt es horizontalen Overflow?
```

### Red Team 4: Differenzierungs-Versagen

```
Test: Konkurrenz-Vergleich
  Öffne die stärkste Wettbewerber-Website.
  Öffne deine Website daneben.
  Was unterscheidet sie in 10 Sekunden?
  → Wenn der Unterschied nicht sofort klar ist: Problem.

Test: Positioning sichtbar?
  Lies das Positioning Statement aus Phase 3.
  Ist es in der Hero-Sektion der Startseite erkennbar?
  → Ohne Positioning Statement nachzulesen: Würde man es erschließen?

Test: Zielgruppen-Spiegelung
  Schreibe die Persona-Beschreibung auf.
  Gehe auf die Startseite.
  Fühlt sich ein Besucher der dieser Person entspricht direkt angesprochen?
  → Wenn es zu generisch ist: konkreter werden.
```

---

## Red Team Ergebnisdokumentation

```yaml
red_team_ergebnisse:
  datum: ""
  
  technisch:
    gefunden: []
    behoben: []
    akzeptiert_mit_begruendung: []
    
  inhaltlich:
    gefunden: []
    behoben: []
    akzeptiert_mit_begruendung: []
    
  conversion:
    gefunden: []
    behoben: []
    akzeptiert_mit_begruendung: []
    
  differenzierung:
    gefunden: []
    behoben: []
    akzeptiert_mit_begruendung: []

  gesamtbewertung: "bereit für Freigabe | Korrekturen nötig"
```

---

## Finale Reflexion vor Freigabe

```
Drei Fragen. Ehrliche Antworten.

FRAGE 1:
Was ist die eine Sache, die diese Website am meisten zurückhält?
→ [Antwort]
→ Ist diese Sache behoben, anerkannt oder akzeptiert?

FRAGE 2:
Würde der Creative Director, der Brand Strategist, der UX Lead und der
Conversion Specialist alle zustimmen, dass das ihr bestes Werk für
dieses Projekt ist?
→ [Ja / Nein / Mit Vorbehalt — mit Begründung]

FRAGE 3:
Was würde ich in der nächsten Iteration als erstes verbessern?
→ [Konkrete Antwort — für das Backlog]
```

**Erst nach diesen drei Fragen: Freigabe oder Korrekturen.**
