export default {
  // Nav
  'nav.home': 'Home',
  'nav.contact': 'Contact',

  // Home
  'home.title': 'Astro v7 Starter',
  'home.description':
    'A minimal, production-ready template with Astro v7, Tailwind v4 and Svelte 5.',
  'home.cta.docs': 'Documentation',
  'home.cta.contact': 'Contact',

  // Feature cards
  'feature.astro.title': 'Astro v7',
  'feature.astro.desc':
    'New dev server with Vite Environment API, Live Content Collections, CSP support.',
  'feature.tailwind.title': 'Tailwind v4',
  'feature.tailwind.desc': 'CSS-first configuration, OKLCH colors, native container queries.',
  'feature.svelte.title': 'Svelte 5',
  'feature.svelte.desc': 'Runes API with $state and $derived for reactive islands.',
  'feature.biome.title': 'Biome',
  'feature.biome.desc': 'A single tool for linting and formatting – fast and consistent.',
  'feature.zod.title': 'Zod v4',
  'feature.zod.desc': 'Runtime validation for environment variables, forms and API endpoints.',
  'feature.darkmode.title': 'Dark Mode',
  'feature.darkmode.desc': 'System preference based with manual toggle via Svelte component.',

  // prop-for-that demo
  'demo.title': 'prop-for-that demo',
  'demo.description':
    'CSS reacting to runtime state via custom properties — no JS in the animation path.',
  'demo.pointer.title': 'Pointer tilt',
  'demo.pointer.desc':
    'Move your cursor over this card — it tilts based on pointer position, driven by the pointer-local plugin.',
  'demo.scroll.title': 'Scroll reveal',
  'demo.scroll.desc':
    'This card fades in once it enters the viewport, driven by the visibility source.',
  'demo.range.title': 'Range fill',
  'demo.range.desc': 'Drag the slider — the fill bar tracks its value with pure CSS.',
  'demo.scrollvelocity.title': 'Scroll velocity',
  'demo.scrollvelocity.desc':
    'Scroll the page — this bar reacts to how fast and in which direction.',
  'demo.clock.title': 'Live clock',
  'demo.clock.desc': 'A pure-CSS second hand — no JS in the render loop.',
  'demo.random.title': 'Random per element',
  'demo.random.desc':
    'Each swatch rolls its own tint and rotation once at load — no JS loop, no :nth-child ladder.',
  'demo.viewport.title': 'Viewport size',
  'demo.viewport.desc':
    'Resize the browser window — this number reads live from CSS counters, no JS text rendering.',
  'demo.size.title': 'Element size',
  'demo.size.desc':
    'Drag the corner of the box — its own size is tracked without a ResizeObserver in your code.',
  'demo.truncated.title': 'Truncation detection',
  'demo.truncated.desc': 'CSS detects when text overflows and reveals a badge automatically.',
  'demo.truncated.sample':
    'This paragraph is intentionally long so it overflows its two-line clamp and triggers the truncated source.',
  'demo.truncated.badge': 'Truncated',
  'demo.color.title': 'Color input',
  'demo.color.desc': 'Pick a color — the swatch background is bound directly to the input value.',

  // Contact
  'contact.title': 'Contact',
  'contact.description': 'Example contact form with Astro Actions and server-side Zod validation.',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.subject': 'Subject',
  'contact.message': 'Message',
  'contact.send': 'Send',

  // 404
  '404.title': '404 - Page Not Found',
  '404.text': 'This page does not exist.',
  '404.back': 'Back to home',

  // Footer
  'footer.built': 'Built with',
} as const;
