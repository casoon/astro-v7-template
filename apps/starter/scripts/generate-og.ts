/**
 * Generate OG images for all static pages.
 * Run with: npx tsx scripts/generate-og.ts
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateOgImage } from '@astro-v7/shared/utils/og';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const fontPath = require.resolve('@fontsource/inter/files/inter-latin-700-normal.woff');
const fontData = readFileSync(fontPath);

const outDir = join(__dirname, '..', 'public', 'og');

const pages = [
  {
    file: 'home.png',
    title: 'Astro v7 Starter',
    description: 'A minimal, production-ready template with Astro v7, Tailwind v4 and Svelte 5.',
  },
  {
    file: 'contact.png',
    title: 'Contact',
    description: 'Contact form with Astro Actions and Zod validation.',
  },
  {
    file: 'de/home.png',
    title: 'Astro v7 Starter',
    description:
      'Ein minimales, produktionsreifes Template mit Astro v7, Tailwind v4 und Svelte 5.',
  },
  {
    file: 'de/contact.png',
    title: 'Kontakt',
    description: 'Beispiel-Kontaktformular mit Astro Actions und serverseitiger Zod-Validierung.',
  },
];

async function main() {
  for (const page of pages) {
    const outPath = join(outDir, page.file);
    mkdirSync(join(outPath, '..'), { recursive: true });

    const png = await generateOgImage(
      { title: page.title, description: page.description, siteName: 'Astro v7 Starter' },
      fontData.buffer as ArrayBuffer
    );

    writeFileSync(outPath, png);
    console.log(`  ✓ ${page.file}`);
  }
}

console.log('Generating OG images...');
main().then(() => console.log('Done.'));
