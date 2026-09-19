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

  // Fixed, unique port so projects scaffolded from this template don't all default to 4321 —
  // sharing a port across projects means the browser serves stale cached assets/cookies from
  // whichever project last ran on it. Change this to a free port when starting a new project
  // (check other repos under ~/GitHub for ports already in use).
  server: {
    host: true,
    port: 5014,
  },

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
        css_architecture: { enabled: true },
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
      // Cloudflare/workerd dev: cold node_modules/.vite/deps_ssr means Vite discovers
      // SSR deps during the first render and fires a "program reload" that kills the
      // workerd runner mid-chunk (exits 1). @astrojs/svelte registers its SSR entry in
      // optimizeDeps.include itself, so noDiscovery alone doesn't stop it from being
      // optimized lazily on first render — it must be listed here to pull it into the
      // initial (pre-request) optimization pass instead. (Astro doesn't read
      // environments.ssr.optimizeDeps — this must be vite.ssr.optimizeDeps.)
      //
      // Every entry must be resolvable *from this app*. tailwind-merge, zod,
      // @lucide/svelte and clsx are dependencies of the shared workspace package, so
      // under pnpm they only exist in shared/node_modules — a bare name resolves to
      // nothing and the entry is silently dropped. They are then discovered during the
      // first render, which triggers "optimized dependencies changed. reloading". That
      // reload bumps Vite's `?v=` hash, and the half-loaded module graph ends up with
      // two instances of svelte/internal/server: the Renderer writes `ssr_context` into
      // one, `push_element` reads it from the other and finds null — "Cannot read
      // properties of null (reading 'function')" on the first render of any page with a
      // Svelte island. Vite's `parent > child` syntax resolves them via the linked package.
      optimizeDeps: {
        noDiscovery: true,
        include: [
          '@astrojs/svelte/server.js',
          '@astro-v7/shared > @lucide/svelte',
          '@astro-v7/shared > clsx',
          '@astro-v7/shared > tailwind-merge',
          '@astro-v7/shared > zod',
          '@casoon/astro-structured-data/components',
          '@casoon/astro-webvitals',
          'astro/logger/console',
        ],
      },
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },
});
