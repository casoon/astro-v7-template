import {
  baseAstroConfig,
  postAuditOptions,
  securityTxt,
  sitemapI18n,
  viteSsrConfig,
} from '@astro-v7/shared/config/astro';
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

// Routes with `prerender = false` — no file in dist, so sitemap and link audit need them listed.
const onDemandRoutes = ['/contact/', '/de/contact/'];

export default defineConfig({
  ...baseAstroConfig,
  site: env.PUBLIC_SITE_URL,
  adapter: cloudflare(),

  // Fixed, unique port so projects scaffolded from this template don't all default to 4321 —
  // sharing a port across projects means the browser serves stale cached assets/cookies from
  // whichever project last ran on it. Change this to a free port when starting a new project
  // (check other repos under ~/GitHub for ports already in use).
  server: {
    host: true,
    port: 5014,
  },

  integrations: [
    webVitalsDashboard({ route: '/web-vitals' }),
    svelte(),
    propsForThat({ enabled: true }),
    siteFiles({
      sitemap: {
        exclude: ['/web-vitals/'],
        sources: [() => onDemandRoutes.map((loc) => ({ loc }))],
        i18n: sitemapI18n,
        audit: {
          warnOnEmpty: true,
          errorOnDuplicates: false,
        },
      },
      robots: { preset: 'seoOnly' },
      security: securityTxt(env.PUBLIC_SECURITY_CONTACT, env.PUBLIC_SITE_URL),
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
    postAudit(postAuditOptions(['404.html', 'web-vitals/index.html'], onDemandRoutes)),
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: viteSsrConfig(['@casoon/astro-webvitals']),
  },
});
