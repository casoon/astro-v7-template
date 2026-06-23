import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import postAudit from '@casoon/astro-post-audit';
import siteFiles from '@casoon/astro-site-files';
import speedMeasure from '@casoon/astro-speed-measure';
import structuredData from '@casoon/astro-structured-data';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { env } from './src/env.ts';
import { getBlogSitemapEntries } from './src/utils/blog-rss.js';

// Astro v7: remark-gfm and rehype-slug removed — Sätteri provides both natively.

/** Shiki transformer: reads title="..." from fence meta and sets data-title on <pre> */
const codeBlockTitleTransformer = {
  name: 'code-block-title',
  pre(node) {
    const meta = this.options?.meta?.__raw ?? '';
    if (!meta) return;
    const m = meta.match(/title="([^"]+)"|title='([^']+)'/);
    if (m) node.properties['data-title'] = m[1] ?? m[2];
  },
};

export default defineConfig({
  trailingSlash: 'always',
  site: env.PUBLIC_SITE_URL,
  adapter: cloudflare(),

  devToolbar: { enabled: false },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    svelte(),
    mdx({
      shikiConfig: {
        wrap: true,
        transformers: [codeBlockTitleTransformer],
      },
    }),
    siteFiles({
      sitemap: {
        i18n: {
          defaultLocale: 'en',
          locales: { en: 'en', de: 'de-DE' },
        },
        exclude: [/\/blog\/?$/, /\/de\/blog\/?$/],
        priority: [
          { pattern: '/$', priority: 1.0 },
          { pattern: '/blog/', priority: 0.7 },
        ],
        changefreq: [
          { pattern: '/$', changefreq: 'weekly' },
          { pattern: '/blog/', changefreq: 'monthly' },
        ],
        // gray-matter reads MDX frontmatter directly — getCollection() unavailable in build hooks
        sources: [getBlogSitemapEntries],
        audit: {
          warnOnEmpty: true,
          errorOnDuplicates: false,
        },
      },
      robots: { preset: 'seoOnly' },
      security: { contact: 'mailto:security@example.com' },
      audit: {
        disable: ['sitemap/duplicate-urls'],
      },
      llms: {
        title: env.PUBLIC_SITE_NAME,
        description: 'A blog template built with Astro v7, MDX and Content Collections.',
        sections: [
          {
            title: 'Pages',
            links: [
              { title: 'Home', url: '/', description: 'Blog template overview.' },
              { title: 'Blog index', url: '/blog/', description: 'English blog archive.' },
              { title: 'German home', url: '/de/', description: 'German localized homepage.' },
              {
                title: 'German blog index',
                url: '/de/blog/',
                description: 'German localized blog archive.',
              },
            ],
          },
        ],
      },
    }),
    structuredData({
      generateMeta: true,
      siteName: env.PUBLIC_SITE_NAME,
      locale: 'en_US',
      defaultArticlePublisher: { name: env.PUBLIC_SITE_NAME },
    }),
    speedMeasure(),
    postAudit({
      preset: 'standard',
      failOn: 'errors',
      progress: 'verbose',
      hints: { sourceFiles: true },
      rules: {
        filters: { exclude: ['blog/index.html', '404.html'] },
        canonical: { self_reference: true },
        opengraph: { require_og_image: true },
        a11y: { require_skip_link: true },
        structured_data: { check_json_ld: true },
        content_quality: {
          detect_duplicate_titles: true,
          detect_duplicate_descriptions: true,
        },
        links: { check_fragments: true },
      },
    }),
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  security: {
    checkOrigin: true,
  },

  csp: {
    algorithm: 'SHA-256',
  },

  // Cloudflare Workers does not support Sharp — use noop image service.
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },

  // Astro v7: compressHTML default changed to 'jsx' (strips whitespace with JSX rules).
  // Set explicitly to avoid surprise whitespace changes around inline elements.
  compressHTML: 'jsx',

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['sharp'],
      noExternal: ['@fontsource/*'],
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },
});
