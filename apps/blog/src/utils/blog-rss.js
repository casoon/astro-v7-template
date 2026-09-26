/**
 * Sitemap source helper for blog posts.
 * Uses gray-matter to read MDX frontmatter directly because Astro's
 * getCollection() is unavailable inside the astro:build:done hook.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const blogContentDir = fileURLToPath(new URL('../content/blog', import.meta.url));

/**
 * Returns sitemap entries for all published blog posts with real lastmod
 * dates from MDX frontmatter. Used by siteFiles({ sitemap: { sources: [...] } }).
 * loc must be a relative path — the integration prepends the siteUrl.
 *
 * @returns {import('@casoon/astro-site-files').SitemapEntry[]}
 */
export function getBlogSitemapEntries() {
  const files = readdirSync(blogContentDir, { recursive: true, encoding: 'utf-8' }).filter(
    (f) => f.endsWith('.mdx') || f.endsWith('.md')
  );

  return files
    .map((file) => {
      const raw = readFileSync(`${blogContentDir}/${file}`, 'utf-8');
      const { data } = matter(raw);
      if (data.draft) return null;
      // en/<slug>.mdx → /blog/<slug>/, de/<slug>.mdx → /de/blog/<slug>/
      const [locale, slug] = file.replace(/\.(mdx|md)$/, '').split('/');
      const lastmod = data.lastmod ?? data.date ?? null;
      return {
        loc: `${locale === 'en' ? '' : `/${locale}`}/blog/${slug}/`,
        lastmod: lastmod ? new Date(lastmod).toISOString().split('T')[0] : undefined,
      };
    })
    .filter(Boolean);
}
