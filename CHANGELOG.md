# Changelog

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
