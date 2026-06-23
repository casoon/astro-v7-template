/**
 * Generate OG images for blog pages and posts.
 * Run with: npx tsx scripts/generate-og.ts
 * Reads MDX/MD frontmatter from src/content/blog/ for dynamic post images.
 */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateOgImage } from '@astro-v7/shared/utils/og';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const fontPath = require.resolve('@fontsource/inter/files/inter-latin-700-normal.woff');
const fontData = readFileSync(fontPath);

const root = join(__dirname, '..');
const outDir = join(root, 'public', 'og');
const contentDir = join(root, 'src', 'content', 'blog');

interface Page {
  file: string;
  title: string;
  description: string;
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      result[key.trim()] = rest
        .join(':')
        .trim()
        .replace(/^['"]|['"]$/g, '');
    }
  }
  return result;
}

function getPages(): Page[] {
  const pages: Page[] = [
    {
      file: 'home.png',
      title: 'Astro v7 Blog',
      description: 'A lean blog template with MDX, Content Collections and RSS feed.',
    },
    {
      file: 'de/home.png',
      title: 'Astro v7 Blog',
      description: 'Ein schlankes Blog-Template mit MDX, Content Collections und RSS-Feed.',
    },
  ];

  const files = readdirSync(contentDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  for (const file of files) {
    const content = readFileSync(join(contentDir, file), 'utf-8');
    const fm = parseFrontmatter(content);
    const slug = file.replace(/\.(md|mdx)$/, '');
    if (fm.title) {
      pages.push({
        file: `blog/${slug}.png`,
        title: fm.title,
        description: fm.description || '',
      });
    }
  }

  return pages;
}

async function main() {
  const pages = getPages();

  for (const page of pages) {
    const outPath = join(outDir, page.file);
    mkdirSync(join(outPath, '..'), { recursive: true });

    const png = await generateOgImage(
      { title: page.title, description: page.description, siteName: 'Astro v7 Blog' },
      fontData.buffer as ArrayBuffer
    );

    writeFileSync(outPath, png);
    console.log(`  ✓ ${page.file}`);
  }
}

console.log('Generating OG images...');
main().then(() => console.log('Done.'));
