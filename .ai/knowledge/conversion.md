# Conversion — Patterns & Psychologie

## Grundsatz

Conversion ist das Ergebnis von Vertrauen, Klarheit und dem richtigen Timing.

```
Conversion = (Motivation × Klarheit) / (Reibung × Angst)

Erhöhe: Motivation (Nutzen kommunizieren)
Erhöhe: Klarheit (was passiert nach dem Klick?)
Senke:  Reibung (wie einfach ist die Aktion?)
Senke:  Angst (was kann schiefgehen?)
```

## Conversion-Hierarchie

Nicht jede Seite hat dasselbe Ziel. Definiere pro Seite:

```yaml
primäre_conversion: "Kontaktformular absenden"
sekundäre_conversion: "Newsletter abonnieren"
tertiäre_conversion: "Telefonnummer anklicken"
```

Optimiere immer für die primäre. Sekundäre und tertiäre nicht behindern.

## CTA-Platzierung

```
Startseite:
  1. Hero — Above the fold (primärer CTA)
  2. Nach dem Problem/Lösung-Block (zweiter CTA)
  3. Nach Social Proof (dritter CTA)
  4. Footer / finaler Block (letzter CTA)

Unterseiten:
  1. Sidebar oder Sticky Header
  2. Ende des Inhalts
  3. Floating Button (mobile)

Regel: Mindestens ein CTA ohne Scrollen sichtbar.
```

## Visuelle Hierarchie für Conversion

```
Attention → Interest → Desire → Action (AIDA)

Attention:
  - Kontrastfarbe für primären CTA
  - Größe: sichtbar, nicht überwältigend
  - Position: natürlicher Blickfluss (F-Pattern oder Z-Pattern)

Interest:
  - Subheadline erklärt den Nutzen
  - Bulletpoints: konkrete Vorteile, keine Eigenschaften

Desire:
  - Social Proof direkt beim CTA
  - Zahlen: "Schließe dich 247 Unternehmen an"
  - Risikominimierung: "Kostenlos, kein Vertrag"

Action:
  - Button-Text: Verb + Nutzen (nicht "Absenden")
  - Mikro-Kopie: "Dauert 2 Minuten. Keine Kreditkarte."
```

## Social Proof — Hierarchie der Überzeugungskraft

```
1. Testimonials mit Namen + Foto + Unternehmen (stärkste)
2. Case Studies mit messbaren Ergebnissen
3. Bekannte Kunden-Logos
4. Zahlen ("247 Kunden", "4.9/5 Sterne")
5. Press / Awards / Zertifikate
6. Testimonials ohne Foto (schwächste)
```

### Testimonial-Format
```
"[Konkretes Problem] → [Konkretes Ergebnis durch das Angebot]"

Nicht:
"Tolle Zusammenarbeit, sehr professionell!" — Max M.

Sondern:
"Innerhalb von 3 Monaten haben wir 40% mehr Anfragen über unsere Website.
 Das Team hat nicht nur designed, sondern wirklich mitgedacht."
— Sarah K., Inhaberin, Steuerberatung Kraft GmbH, Hamburg
```

## Formular-Optimierung

```
Grundregel: So wenig Felder wie möglich.

Jedes zusätzliche Feld senkt die Conversion um ~5-10%.

Pflichtfelder wirklich nötig?
  Name: ✅ (Personalisierung)
  E-Mail: ✅ (Kontakt)
  Telefon: ⚠️ (nur wenn wirklich nötig)
  Unternehmen: ⚠️ (nur B2B wenn wichtig)
  Budget: ❌ (schreckt ab)
  "Wie haben Sie uns gefunden?": ❌ (intern über Analytics lösen)

Multi-Step Formulare bei vielen Feldern:
  Schritt 1: E-Mail + Name (niedrige Hemmschwelle)
  Schritt 2: Details (wenn Schritt 1 ausgefüllt, höhere Completion-Rate)
```

### Erfolgs-Feedback
```astro
{result?.data?.success && (
  <div role="alert" aria-live="assertive" class="success-message">
    <CheckIcon aria-hidden="true" />
    <p>
      <strong>Vielen Dank, {name}!</strong><br />
      Wir melden uns innerhalb von 24 Stunden bei dir.
    </p>
  </div>
)}
```

Elemente:
- Personalisierung (Name verwenden)
- Konkrete Zeitangabe ("innerhalb von 24 Stunden")
- Nächster Schritt klar ("Wir melden uns")
- Keine generische "Nachricht gesendet"-Meldung

## Risikominimierung

```
Beim primären CTA:
  "Kostenlos" — wenn kostenlos
  "Unverbindlich" — wenn kein Vertrag
  "Keine Kreditkarte" — wenn kein Zahlungsdetail nötig
  "Jederzeit kündbar" — wenn Abonnement
  "30 Tage Geld-zurück" — wenn Garantie vorhanden
  "Festpreis" — wenn kein variables Pricing

Beispiel:
  [Kostenlose Beratung buchen]
  Kein Vertrag. Kein Verkaufsdruck. 30 Minuten.
```

## Dringlichkeit (ethisch einsetzen)

```
✅ Echte Dringlichkeit:
  "Nur noch 3 Plätze im Dezember"
  "Angebot gilt bis Freitag"
  "Nächster Onboarding-Termin: 15. Januar"

❌ Fake-Dringlichkeit (zerstört Vertrauen):
  Countdown-Timer der sich immer neustartet
  "Nur noch 2 verfügbar!" (keine Wahrheit)
  "Preis steigt morgen" (ohne Grund)
```

## Conversion nach Bewusstseinsstufe

```
Stufe 1 — Problem-unbewusst:
  Ziel: Problem-Bewusstsein wecken
  Content: Informativ, keine Verkaufssprache
  CTA: "Mehr erfahren", "Artikel lesen"

Stufe 2 — Problem-bewusst:
  Ziel: Lösung zeigen
  Content: Problem benennen, Lösung skizzieren
  CTA: "So lösen wir das", "Unsere Methode"

Stufe 3 — Lösung-bewusst:
  Ziel: Produkt/Angebot positionieren
  Content: Vergleich, Differenzierung, Vorteile
  CTA: "Unser Angebot ansehen", "Preise vergleichen"

Stufe 4 — Produkt-bewusst:
  Ziel: Kaufentscheidung erleichtern
  Content: Social Proof, Garantien, FAQ
  CTA: "Jetzt anfragen", "Demo buchen"

Stufe 5 — Kaufbereit:
  Ziel: Reibung eliminieren
  Content: Minimal, klarer nächster Schritt
  CTA: "Jetzt starten", "Kaufen"
```

## Mobile Conversion

```
Mobile Besucher haben:
  - Kürzere Aufmerksamkeitsspanne
  - Schlechtere Verbindung (Performance wichtiger)
  - Andere Absicht (oft Recherche, nicht sofort kaufen)

Mobile-spezifische Optimierungen:
  [ ] Sticky CTA Button (fixed bottom auf Mobile)
  [ ] Click-to-Call für Telefonnummern
  [ ] Formular-Felder: mindestens 44px touch-target
  [ ] Autofill-Attribute für schnelleres Ausfüllen
  [ ] Keine Hover-only Interaktionen
  [ ] CTA above the fold auch auf 375px
```

## A/B Test Prioritäten

Wenn Tests möglich sind, in dieser Reihenfolge testen:

```
1. Headline (größte Wirkung)
2. CTA-Text
3. CTA-Farbe
4. Hero-Bild / Video
5. Social Proof Platzierung
6. Formular-Länge
7. Preisdarstellung
```
