import cloudflare from '@astrojs/cloudflare';
import svelte from '@astrojs/svelte';
import postAudit from '@casoon/astro-post-audit';
import siteFiles from '@casoon/astro-site-files';
import speedMeasure from '@casoon/astro-speed-measure';
import structuredData from '@casoon/astro-structured-data';
import { webVitalsDashboard } from '@casoon/astro-webvitals/integration';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import propsForThat from '../../integrations/props-for-that.mjs';
import { env } from './src/env.ts';

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
    webVitalsDashboard({ route: '/web-vitals' }),
    svelte(),
    propsForThat({ enabled: true }),
    siteFiles({
      sitemap: {
        exclude: ['/web-vitals/'],
        i18n: {
          defaultLocale: 'en',
          locales: { en: 'en', de: 'de-DE' },
        },
        audit: {
          warnOnEmpty: true,
          errorOnDuplicates: false,
        },
      },
      robots: { preset: 'seoOnly' },
      security: { contact: 'mailto:security@example.com' },
      llms: {
        title: env.PUBLIC_SITE_NAME,
        description: 'Astro v7 starter with Tailwind v4, Svelte 5 and Cloudflare.',
        sections: [
          {
            title: 'Pages',
            links: [
              { title: 'Home', url: '/', description: 'Starter template overview.' },
              { title: 'Contact', url: '/contact/', description: 'Example contact form.' },
              { title: 'German home', url: '/de/', description: 'German localized homepage.' },
              {
                title: 'German contact',
                url: '/de/contact/',
                description: 'German localized contact form.',
              },
            ],
          },
        ],
      },
    }),
    structuredData({ generateMeta: true, siteName: env.PUBLIC_SITE_NAME, locale: 'en_US' }),
    speedMeasure(),
    postAudit({
      preset: 'standard',
      failOn: 'errors',
      progress: 'verbose',
      hints: { sourceFiles: true },
      contentStyle: true,
      rules: {
        filters: { exclude: ['404.html', 'web-vitals/index.html'] },
        canonical: { self_reference: true },
        opengraph: { require_og_image: true },
        a11y: { require_skip_link: true },
        structured_data: { check_json_ld: true },
        html_validation: { enabled: true },
        severity: { 'html/assertion.roles.unnecessary-list': 'off' },
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
