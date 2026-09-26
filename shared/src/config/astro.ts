/**
 * Astro config shared by all apps. Integrations and the adapter stay in each app's
 * astro.config.mjs because their packages are app dependencies; this module only
 * holds plain option objects.
 */

import { existsSync, readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

/**
 * Environment for astro.config.mjs. Astro evaluates the config with Vite's default `VITE_`
 * env prefix, so `PUBLIC_*` values from `.env` never reach `import.meta.env` there and
 * `site`, canonical URLs and the sitemap would silently fall back to the defaults.
 * Reads the app's `.env` explicitly; variables set in the shell take precedence.
 */
export function configEnv(envFile: URL): Record<string, string | undefined> {
  const fileEnv = existsSync(envFile) ? parseEnv(readFileSync(envFile, 'utf-8')) : {};
  return { ...fileEnv, ...process.env };
}

export const baseAstroConfig = {
  trailingSlash: 'always',
  devToolbar: { enabled: false },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

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

  build: {
    inlineStylesheets: 'auto',
  },
} as const;

/** Sitemap hreflang mapping for `@casoon/astro-site-files`. */
export const sitemapI18n = {
  defaultLocale: 'en',
  locales: { en: 'en', de: 'de-DE' },
};

/**
 * `/.well-known/security.txt` options for `@casoon/astro-site-files`, or `undefined` when no
 * contact is configured. Expires is rolled forward on every build (RFC 9116 recommends < 1 year).
 */
export function securityTxt(contact: string | undefined, siteUrl: string) {
  if (!contact) return undefined;
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
  return {
    contact,
    expires: expires.toISOString(),
    preferredLanguages: ['en', 'de'],
    canonical: new URL('/.well-known/security.txt', siteUrl).href,
  };
}

/**
 * `vite.ssr` options for the Cloudflare/workerd dev server.
 *
 * Cold node_modules/.vite/deps_ssr means Vite discovers SSR deps during the first
 * render and fires a "program reload" that kills the workerd runner mid-chunk (exits 1).
 * @astrojs/svelte registers its SSR entry in optimizeDeps.include itself, so noDiscovery
 * alone doesn't stop it from being optimized lazily on first render — it must be listed
 * here to pull it into the initial (pre-request) optimization pass instead. (Astro
 * doesn't read environments.ssr.optimizeDeps — this must be vite.ssr.optimizeDeps.)
 *
 * Every entry must be resolvable *from the app*. tailwind-merge, zod, @lucide/svelte and
 * clsx are dependencies of the shared workspace package, so under pnpm they only exist
 * in shared/node_modules — a bare name resolves to nothing and the entry is silently
 * dropped. They are then discovered during the first render, which triggers "optimized
 * dependencies changed. reloading". That reload bumps Vite's `?v=` hash, and the
 * half-loaded module graph ends up with two instances of svelte/internal/server: the
 * Renderer writes `ssr_context` into one, `push_element` reads it from the other and
 * finds null — "Cannot read properties of null (reading 'function')" on the first render
 * of any page with a Svelte island. Vite's `parent > child` syntax resolves them via the
 * linked package.
 *
 * @param appIncludes additional entries from the app's own dependencies
 */
export function viteSsrConfig(appIncludes: string[] = []) {
  return {
    external: ['sharp'],
    noExternal: ['@fontsource/*'],
    optimizeDeps: {
      noDiscovery: true,
      include: [
        '@astrojs/svelte/server.js',
        '@astro-v7/shared > @lucide/svelte',
        '@astro-v7/shared > clsx',
        '@astro-v7/shared > tailwind-merge',
        '@astro-v7/shared > zod',
        '@casoon/astro-structured-data/components',
        'astro/logger/console',
        ...appIncludes,
      ],
    },
  };
}

/**
 * Options for `@casoon/astro-post-audit`.
 * @param exclude built HTML files to skip (relative to dist)
 * @param knownRoutes on-demand routes (`prerender = false`) that have no file in dist
 */
export function postAuditOptions(exclude: string[], knownRoutes: string[] = []) {
  return {
    preset: 'standard',
    failOn: 'errors',
    progress: 'verbose',
    hints: { sourceFiles: true },
    contentStyle: true,
    rules: {
      filters: { exclude },
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
      links: { check_fragments: true, known_routes: knownRoutes },
    },
  } as const;
}
