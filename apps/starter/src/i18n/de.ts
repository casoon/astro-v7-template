export default {
  // Nav
  'nav.home': 'Startseite',
  'nav.contact': 'Kontakt',

  // Home
  'home.title': 'Astro v7 Starter auf Deutsch',
  'home.description':
    'Ein minimales, produktionsreifes Template mit Astro v7, Tailwind v4 und Svelte 5.',
  'home.cta.docs': 'Dokumentation',
  'home.cta.contact': 'Kontakt',

  // Feature cards
  'feature.astro.title': 'Astro v7',
  'feature.astro.desc':
    'Neuer Dev-Server mit Vite Environment API, Live Content Collections, CSP-Unterstützung.',
  'feature.tailwind.title': 'Tailwind v4',
  'feature.tailwind.desc': 'CSS-first-Konfiguration, OKLCH-Farben, native Container Queries.',
  'feature.svelte.title': 'Svelte 5',
  'feature.svelte.desc': 'Runes-API mit $state und $derived für reaktive Islands.',
  'feature.biome.title': 'Biome',
  'feature.biome.desc': 'Ein einziges Tool für Linting und Formatierung – schnell und konsistent.',
  'feature.zod.title': 'Zod v4',
  'feature.zod.desc': 'Laufzeit-Validierung für Umgebungsvariablen, Formulare und API-Endpunkte.',
  'feature.darkmode.title': 'Dark Mode',
  'feature.darkmode.desc':
    'Basierend auf Systemeinstellung mit manuellem Toggle über Svelte-Komponente.',

  // prop-for-that Demo
  'demo.title': 'prop-for-that Demo',
  'demo.description':
    'CSS reagiert auf Laufzeitzustand über Custom Properties – ganz ohne JS im Animationspfad.',
  'demo.pointer.title': 'Pointer-Tilt',
  'demo.pointer.desc':
    'Bewege den Mauszeiger über diese Karte – sie neigt sich je nach Zeigerposition, gesteuert vom pointer-local-Plugin.',
  'demo.scroll.title': 'Scroll-Reveal',
  'demo.scroll.desc':
    'Diese Karte blendet sich ein, sobald sie in den Viewport scrollt, gesteuert von der visibility-Quelle.',
  'demo.range.title': 'Range-Füllstand',
  'demo.range.desc': 'Ziehe am Regler – die Füllleiste folgt dem Wert rein über CSS.',
  'demo.scrollvelocity.title': 'Scroll-Geschwindigkeit',
  'demo.scrollvelocity.desc': 'Scrolle die Seite – dieser Balken reagiert auf Tempo und Richtung.',
  'demo.clock.title': 'Live-Uhr',
  'demo.clock.desc': 'Ein reiner CSS-Sekundenzeiger – ganz ohne JS im Render-Loop.',
  'demo.random.title': 'Zufall pro Element',
  'demo.random.desc':
    'Jedes Feld würfelt einmalig beim Laden Farbton und Rotation – ohne JS-Loop, ohne :nth-child-Leiter.',
  'demo.viewport.title': 'Viewport-Größe',
  'demo.viewport.desc':
    'Verändere die Fenstergröße – die Zahl kommt live aus CSS-Countern, ganz ohne JS-Textrendering.',
  'demo.size.title': 'Elementgröße',
  'demo.size.desc':
    'Ziehe an der Ecke der Box – ihre eigene Größe wird verfolgt, ganz ohne ResizeObserver im Code.',
  'demo.truncated.title': 'Trunkierungs-Erkennung',
  'demo.truncated.desc': 'CSS erkennt, wenn Text überläuft, und zeigt automatisch ein Badge an.',
  'demo.truncated.sample':
    'Dieser Absatz ist absichtlich lang, damit er sein zweizeiliges Clamp überläuft und die truncated-Quelle auslöst.',
  'demo.truncated.badge': 'Abgeschnitten',
  'demo.color.title': 'Farbeingabe',
  'demo.color.desc': 'Wähle eine Farbe – der Farbfleck ist direkt an den Eingabewert gebunden.',

  // Contact
  'contact.title': 'Kontakt',
  'contact.description':
    'Beispiel-Kontaktformular mit Astro Actions und serverseitiger Zod-Validierung.',
  'contact.name': 'Name',
  'contact.email': 'E-Mail',
  'contact.subject': 'Betreff',
  'contact.message': 'Nachricht',
  'contact.send': 'Senden',

  // 404
  '404.title': '404 - Seite nicht gefunden',
  '404.text': 'Diese Seite existiert nicht.',
  '404.back': 'Zurück zur Startseite',

  // Footer
  'footer.built': 'Erstellt mit',
} as const;
