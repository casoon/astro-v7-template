# Changelog

## Unreleased

### Changed

- Volta pins Node.js 24.21.0 (latest Node 24 LTS, was 24.14.1); minimum stays `>=22.12.0` like Astro's own engines.
- CI uses `actions/checkout@v6` and `actions/upload-artifact@v6` — the Node 24 runtimes — instead of the deprecated Node 20 `@v4` versions.

## 1.3.3 (2026-09-26)

### Added

- Unit tests for the shared utilities (`pnpm test:unit`, Node's built-in test runner), also run in CI.

### Fixed

- `shared` was never type-checked (no `type-check` script), so missing Node types in `shared/src/config/astro.ts` went unnoticed. `shared` now runs `tsc --noEmit` as part of `pnpm type-check`, with `@types/node` as a dev dependency.

### Changed

- Translation keys are typed: `de.ts` must match the keys of `en.ts`, and `t(locale)` only accepts known keys — missing or misspelled keys fail `astro check` instead of rendering the key name.
- The blog build fails when a published post is missing in a locale (the sitemap would otherwise advertise hreflang alternates that 404).
- Sessions are disabled (`session: false`); the unused `SESSION` KV binding and `SessionData` type are removed.
- JSON-LD now fills the recommended fields (Organization logo/contact/address/sameAs, WebPage dates/author/image, BlogPosting publisher logo) from a demo profile in `shared/src/config/site.ts` (example.com, 555-01xx) plus a `logo.svg` per app — no more structured-data warnings in the build.
- Starter hero subtitle uses `text-balance` (no orphaned last word).
- README deploy checklist: add rate limiting or Turnstile once the contact form actually sends mail.

## 1.3.2 (2026-09-26)

### Added

- Web Vitals RUM showcase with a typed, batch-reporting endpoint and Playwright coverage for payload validation and browser transport.
- Sitemap RUM test mode that opens every sitemap URL and verifies that it reports browser metrics.
- Local Web Vitals dashboard route backed by browser storage.
- Documentation explaining the complementary static Post-Audit and field Web Vitals checks.
- German blog posts (`src/content/blog/de/`) with their own OG images and sitemap `lastmod`.
- Contact form honeypot and a `deliverContactMessage()` hook; without a provider the page shows a demo notice instead of claiming the message was sent.
- `PUBLIC_SECURITY_CONTACT` env var for `security.txt` (with rolling `Expires`).
- Shared Astro base config in `shared/src/config/astro.ts`.

### Fixed

- Contact form submission returned 405 in production: the contact pages were prerendered, and `not_found_handling = "404-page"` answered browser navigations to on-demand routes with the 404 page. Contact pages are now rendered on request and the starter no longer sets `not_found_handling`.
- Blog posts still referred to Astro v6.
- German blog pages rendered English post bodies.
- Starter "Astro v7" feature card described v6 features; blog footer lost the space before "RSS Feed" (`compressHTML: 'jsx'`).
- `PUBLIC_*` values from an app's `.env` were ignored in `astro.config.mjs` (Vite loads the config with the `VITE_` prefix), so `site`, canonical URLs and the sitemap always used the defaults. The config now reads `.env` via `configEnv()`.

### Changed

- Blog posts moved to one folder per locale; `titleDe`/`descriptionDe` frontmatter removed.
- Starter `wrangler.toml` no longer pins a KV namespace id or custom domain.
- Starter E2E tests run against `wrangler dev` instead of a static file server.
- Default `PUBLIC_SITE_URL`: starter `https://astro-v7-template.casoon.dev` (the live demo), blog `https://astro-v7-blog.casoon.dev` (both live demos; `astrov7.casoon.dev` / `astrov7blog.casoon.dev` no longer resolve).
- Dependencies: astro 7.3.5, @astrojs/cloudflare 14.3.3, @casoon/astro-post-audit 0.7.0, zod 4.6.5, wrangler 4.140, Biome 2.5.14.

- The Web Vitals endpoint is platform-independent; Cloudflare Analytics Engine is no longer required.
- Starter pages share a dedicated layout that applies Web Vitals consistently.
- The starter now uses `@casoon/astro-webvitals` 0.4.8 with browser-local page checks alongside the sitemap QA pass.
- `pnpm audit:pages` and `pnpm audit:pages:dev` print the sitemap page-check results in the terminal.

## 1.0.0 (2026-06-23)

Initial release based on [astro-v6-template](https://github.com/casoon/astro-v6-template) v1.4.4.

### Upgrades

- `astro` → v7.0.0 (Vite 8, Rolldown bundler, Rust compiler, Sätteri markdown)
- `@astrojs/cloudflare` → v14.0.0
- `@astrojs/mdx` → v7.0.0
- `@astrojs/svelte` → v9.0.0
- `wrangler.toml` compatibility_date → 2026-06-01

### Removals

- Removed `remark-gfm` — Sätteri provides GitHub Flavored Markdown natively
- Removed `rehype-slug` — Sätteri generates heading anchor IDs natively

### Changes

- `compressHTML: 'jsx'` set explicitly in both app configs (new Astro v7 default)
- Blog `astro.config.mjs`: removed `remarkPlugins` and `rehypePlugins` from `mdx()`
- All `@astro-v6/*` package namespaces renamed to `@astro-v7/*`
- Worker names updated: `astro-v7-starter`, `astro-v7-blog`
- `PUBLIC_SITE_URL` defaults updated to `astrov7.casoon.dev` / `astrov7blog.casoon.dev`
