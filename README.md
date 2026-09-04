# Astro v7 Template

<!-- BADGES:START -->
[![CI](https://github.com/casoon/astro-v7-template/actions/workflows/ci.yml/badge.svg)](https://github.com/casoon/astro-v7-template/actions/workflows/ci.yml)
[![Astro](https://img.shields.io/badge/Astro-7.2.10-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Svelte](https://img.shields.io/badge/Svelte-5.57.0-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Biome-2.5.11-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)
[![Zod](https://img.shields.io/badge/Zod-4.5.4-3068B7?logo=zod&logoColor=white)](https://zod.dev)
[![pnpm](https://img.shields.io/badge/pnpm-11.0.9-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![nosecrets](https://img.shields.io/badge/nosecrets-0.3.7-4B32C3?logo=gnuprivacyguard&logoColor=white)](https://www.npmjs.com/package/@casoon/nosecrets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- BADGES:END -->

A lean, production-ready **Astro v7** monorepo template with Tailwind v4, Svelte 5 and Biome.

**Live Demos:** [Starter](https://astrov7.casoon.dev) · [Blog](https://astrov7blog.casoon.dev) · [Starter (Worker)](https://astro-v7-template.casoon.dev)

> **Status:** Astro v7 is stable. This template tracks the latest Astro v7 releases.

## Predecessor

This template succeeds [astro-v6-template](https://github.com/casoon/astro-v6-template).

### What Changed from v6?

| Area | v6 | v7 |
|---|---|---|
| Build system | Vite 7 + Rollup | Vite 8 + **Rolldown** (Rust, 15–61% faster) |
| `.astro` compiler | Go-based | **Rust-based** (stricter HTML, all tags must close) |
| `compressHTML` default | `true` | `'jsx'` (JSX-style whitespace stripping) |
| Markdown processor | remark/rehype | **Sätteri** (Rust, GFM + heading IDs built-in) |
| `remark-gfm` / `rehype-slug` | Explicit plugins needed | **Removed** — Sätteri provides both natively |
| `@astrojs/cloudflare` | v13 | **v14** |
| `@astrojs/mdx` | v6 | **v7** |
| `@astrojs/svelte` | v8 | **v9** |
| `src/fetch.ts` | User-defined file | **Reserved** for advanced routing |
| Advanced routing | Experimental | Stable (no `experimental.advancedRouting` flag) |
| Dev server | Standard | Background mode: `astro dev --background` |

#### Breaking changes you need to know

**Rust compiler — all HTML tags must be closed**

The new Rust `.astro` compiler is strict about HTML. All non-void elements must have a matching closing tag — unclosed tags that previously rendered fine will now produce build errors.

**`compressHTML: 'jsx'`**

Whitespace is stripped using JSX rules instead of HTML-aware compression. This can collapse the space between adjacent inline elements:

```html
<!-- renders "helloworld" with v7 default, not "hello world" -->
<span>hello</span><em>world</em>
```

Fix: add `{" "}` between inline elements, or override with `compressHTML: true`. This template sets `compressHTML: 'jsx'` explicitly so the behavior is visible in config.

**Sätteri replaces remark/rehype**

Astro v7 ships Sätteri, a Rust-powered markdown processor, as the default. GitHub Flavored Markdown (tables, strikethrough, etc.) and heading anchor IDs (`rehype-slug` behavior) work out of the box — no plugins needed. If you need custom remark/rehype plugins, install `@astrojs/markdown-remark` and configure `markdown: { processor: unified() }`.

**`@astrojs/cloudflare` v14**

The v14 adapter removed the `workerEntryPoint` and `cloudflareModules` config options. The adapter now runs workerd at every stage (dev, prerender, production). If you were using these options in v13, remove them.

**`src/fetch.ts` is reserved**

Astro v7 uses `src/fetch.ts` as the entry point for advanced routing. Rename any existing file with that name, or configure `fetchFile: null` in `astro.config.mjs`.

## Multi-Project Architecture

This template uses **pnpm workspaces** with a shared library, making it an ideal foundation for running **multiple projects from a single repository**. Typical use cases:

- **Main site** + **Blog** (included as `starter` and `blog`)
- **Landing pages** for campaigns or product launches
- **Online shop** storefront
- **Documentation** site

All projects share the same design tokens, UI components and utilities — ensuring a consistent look and feel while keeping each app independently deployable. Adding a new project is as simple as creating a new folder under `apps/` and importing from `shared/`.

## Features

- **Astro v7** — Vite 8 + Rolldown, Rust compiler, Sätteri markdown, stable advanced routing
- **Tailwind v4** — CSS-first config, Vite plugin, OKLCH colors
- **Svelte 5** — Runes API ($state, $derived) for reactive islands
- **i18n** — Multi-language support (en/de) with Astro i18n routing
- **OG Images** — Auto-generated Open Graph images at build time (Satori + resvg)
- **Astro Actions** — Server-side contact form handling
- **CSP** — Content Security Policy with SHA-256 nonces
- **Build Metrics** — `@casoon/astro-speed-measure` for build performance tracking
- **Post-Build Audit** — `@casoon/astro-post-audit` for SEO, link and WCAG checks after every build
- **Code Analysis** — fallow for dead code, complexity hotspots and duplication detection
- **prop-for-that** — reactive CSS custom properties (pointer, scroll, viewport, form state, ...) via a toggleable integration, demoed on the starter homepage
- **Web Vitals** — `@casoon/astro-webvitals` RUM in production, reporting sampled Core Web Vitals through a platform-independent, typed API route
- **Secret Scanning** — `@casoon/nosecrets` in pre-commit plus manual workspace scans
- **Playwright** — E2E tests for both apps with axe-core a11y scanning
- **Biome** — Single tool for linting + formatting (replaces ESLint + Prettier)
- **Zod v4** — Runtime validation for env and forms
- **pnpm Workspaces** — Monorepo with catalog for centralized dependency management
- **Dark Mode** — System preference + manual toggle
- **Site Files** — `@casoon/astro-site-files` generates `robots.txt`, `sitemap.xml`, `llms.txt`, `security.txt` and `humans.txt` at build time
- **Structured Data** — `@casoon/astro-structured-data` generates JSON-LD via typed Astro components
- **SEO** — robots.txt, canonical URLs, meta descriptions, Open Graph
- **WCAG 2.1 AA** — Two-layer accessibility: axe-core runtime checks + static HTML audit
- **TypeScript Strict** — Fully typed throughout

## Structure

```
astro-v7-template/
├── apps/
│   ├── starter/          # Landing page + contact form + i18n
│   └── blog/             # Blog with MDX + RSS + i18n
├── shared/                # Design tokens, components, layouts, SEO, utilities
├── integrations/         # Custom Astro integrations (e.g. prop-for-that)
├── e2e/
│   ├── starter/          # Playwright E2E tests for starter
│   └── blog/             # Playwright E2E tests for blog
├── .github/workflows/    # CI pipeline
├── biome.json            # Linting & formatting
├── playwright.config.ts  # E2E test configuration
└── pnpm-workspace.yaml   # Workspace + catalog
```

## Prerequisites

- **Node.js** >= 22.12.0
- **pnpm** >= 11.0.0

## Quick Start

```bash
git clone https://github.com/casoon/astro-v7-template.git
cd astro-v7-template
pnpm install

# Start the starter app
pnpm dev

# Start the blog app
pnpm dev:blog
```

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the starter app (port 4321) |
| `pnpm dev:blog` | Start the blog app (port 4322) |
| `pnpm build` | Build all apps |
| `pnpm build:starter` | Build starter only |
| `pnpm build:blog` | Build blog only |
| `pnpm preview` | Preview the built starter app |
| `pnpm preview:starter` | Preview the built starter app |
| `pnpm preview:blog` | Preview the built blog app |
| `pnpm check` | Run Biome lint + format check |
| `pnpm check:fix` | Biome auto-fix |
| `pnpm format` | Format all files |
| `pnpm test:e2e` | Run all Playwright E2E tests |
| `pnpm test:e2e:starter` | E2E tests for starter only |
| `pnpm test:e2e:starter:sitemap-rum` | Verify RUM transport for every starter sitemap URL |
| `pnpm audit:pages` | Build and check page metadata and basic accessibility signals for every sitemap URL |
| `pnpm audit:pages:dev` | Run the same page checks against `astro dev` |
| `pnpm test:e2e:blog` | E2E tests for blog only |
| `pnpm type-check` | TypeScript check |
| `pnpm fallow:dead` | Detect unused files, exports and dependencies |
| `pnpm fallow:health` | Complexity score, hotspots and refactor targets |
| `pnpm fallow:audit` | Combined dead-code + complexity + duplication audit |
| `pnpm secrets:scan` | Scan the workspace for leaked secrets |
| `pnpm secrets:scan:staged` | Scan only staged files for leaked secrets |
| `pnpm deploy` | Build and deploy both apps to Cloudflare Workers |
| `pnpm deploy:starter` | Build and deploy the starter app |
| `pnpm deploy:blog` | Build and deploy the blog app |
| `pnpm clean` | Remove build artifacts + node_modules |

## Known Issues

- **TypeScript pinned to `^6.0.3`.** `@astrojs/check` (via `@astrojs/language-server`) restricts its `typescript` peer to `^5.0.0 || ^6.0.0` — TypeScript 7's native compiler doesn't yet expose the programmatic API `astro check` relies on. Revisit once Astro's language server supports it ([withastro/roadmap#1321](https://github.com/withastro/roadmap/discussions/1321)).

## Apps

### Starter

Landing page featuring:
- Hero section with feature grid
- Contact form with Astro Actions + Zod validation
- i18n (English + German) with language switcher
- OG image generation per page and locale
- Dark mode toggle
- SEO component with JSON-LD
- prop-for-that demo section (pointer tilt, scroll reveal, range/clock/viewport/size/truncation/color-input sources)
- Web Vitals RUM (`@casoon/astro-webvitals`) with a platform-independent analytics endpoint

### Blog

Blog template featuring:
- MDX support with Sätteri (GFM + heading IDs built-in), code block language labels and Shiki title transformer
- Content Collections (Loader API) with schema fields for `readTime`, `articleType`, `series` and `seriesOrder`
- Table of Contents — sticky sidebar on desktop with IntersectionObserver scrollspy
- Reading progress bar — thin indicator at the top of every post
- Enriched RSS feed (`/rss.xml`) with `article:readingTime`, `article:series` and OG image enclosures
- Automatic sitemap (`/sitemap.xml`) with i18n hreflang via `@casoon/astro-site-files`
- i18n (English + German) with language switcher
- OG image generation per page and blog post
- Tag display

## prop-for-that Integration

[`prop-for-that`](https://www.npmjs.com/package/prop-for-that) exposes runtime state (pointer, scroll, viewport, form state, ...) as CSS custom properties, so effects can be driven with plain CSS instead of JavaScript. It's wired up as a template-wide integration (`integrations/props-for-that.mjs`) rather than a shared component, so any project cloned from this template gets it for free.

- Registered per app in `astro.config.mjs` via `propsForThat({ enabled: true })` — set `enabled: false` to strip the injected script from a clone that doesn't need it.
- The auto-bootstrap is a no-op until an element carries a `data-props-for` attribute, so pages that don't use it pay no runtime cost.
- See the starter homepage for a live demo, and `shared/src/styles/global.css` for the corresponding `.props-*` utility classes.

## Web Vitals Monitoring

[`@casoon/astro-webvitals`](https://www.npmjs.com/package/@casoon/astro-webvitals) v0.4.8 measures Core Web Vitals (LCP, CLS, INP) plus FCP/TTFB in the browser and reports them through a sampled, batched endpoint:

- `apps/starter/src/layouts/StarterLayout.astro` applies `<WebVitals debug={import.meta.env.DEV} endpoint="/api/analytics/vitals/" sampleRate={import.meta.env.DEV ? 1 : 0.1} dashboard />` to every starter page. The overlay appears only in development; every local session and 10% of production sessions report metrics.
- `apps/starter/src/pages/api/analytics/vitals.ts` validates the batch payload with Zod and returns `204`. It has no Cloudflare runtime import, so it works unchanged with Node, Vercel, Netlify and Cloudflare adapters.
- The default endpoint intentionally does not persist analytics data. Add your database, queue or analytics-provider call after validation; this keeps the template portable and makes the data destination an explicit choice.
- Each report contains `id`, `delta`, `rating` and `navigationType` when available. Aggregate `delta` by `id`; supporting metrics such as Long Tasks and navigation timings legitimately omit a rating.
- Optional package features are `attribution`, `trackLongTasks`, `trackSoftNavigations`, `retryFailedMetrics`, `consent` and `respectDnt`. Enable them only after defining the corresponding data and privacy policy.
- `apps/starter/astro.config.mjs` uses `webVitalsDashboard({ route: '/web-vitals' })` from `@casoon/astro-webvitals/integration` to inject the noindex route `/web-vitals/`. It is excluded from the sitemap and Post-Audit because it is an internal tool. It reads at most 200 local metrics from this browser's storage, has clear and sitemap-pass controls, and requires neither Cloudflare nor a database.
- Open `/web-vitals/` after visiting a starter page to inspect the latest local metrics per URL. **Run sitemap pass** visits each page in `/sitemap.xml` in this tab, waits for local measurements and returns to the dashboard. `astro dev` supplies a matching fallback for static `src/pages` routes; preview and production use the generated sitemap. It is browser-local QA data, not shared or representative production analytics.

### Static and field checks

`@casoon/astro-post-audit` is the static counterpart to Web Vitals: it checks rendered SEO, links and lightweight accessibility rules at build time, while Web Vitals captures what users experience in the browser. The starter's build runs both layers.

Both apps configure `@casoon/astro-post-audit` (v0.5.5) identically in `astro.config.mjs`: `preset: 'standard'` with `failOn: 'errors'` (only real errors fail the build; advisory/info findings do not), `progress: 'verbose'`, `hints: { sourceFiles: true }` to map findings back to source files, and `contentStyle: true` for heuristic tone/language checks. The `rules` block enables `canonical.self_reference`, `opengraph.require_og_image`, `a11y.require_skip_link`, `structured_data.check_json_ld`, `html_validation.enabled`, duplicate title/description detection under `content_quality`, and `links.check_fragments`, with `severity` overriding `html/assertion.roles.unnecessary-list` to `off` (a false positive for this template's semantic list markup). `rules.filters.exclude` skips `404.html` on both apps, plus `web-vitals/index.html` (starter — noindexed dashboard route) and `blog/index.html` (blog — an empty `Astro.redirect('/')` stub, which post-audit would otherwise flag as a 0-byte file).

`e2e/starter/web-vitals.spec.ts` verifies the analytics contract for an official vital and a supporting metric, then confirms browser transport, the local dashboard route and the sitemap pass returning after every sitemap page. The endpoint contract is tested without requiring a Cloudflare Analytics Engine binding.

Run `pnpm test:e2e:starter:sitemap-rum` for the opt-in sitemap RUM mode. It gets every URL from `/sitemap.xml`, opens it in a browser and requires a valid batched TTFB report. The normal E2E commands exclude this broader browser pass.

Run `pnpm audit:pages` for a terminal report of the browser-visible page checks collected by the Web Vitals dashboard. It builds the starter first and uses the generated sitemap, so it is suitable for CI. `pnpm audit:pages:dev` starts (or reuses) the starter dev server and checks the static-page sitemap fallback for a fast local loop. Restart an already running dev server after upgrading `@casoon/astro-webvitals`, so Vite loads the new browser bundle. Both commands exit with an error when a page has an issue.

## Adding Another App

Use `apps/starter` or `apps/blog` as the starting point, depending on whether the new project is page-focused or content-focused.

1. Create `apps/<name>/` with its own `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/` and `public/` folders.
2. Set the package name to `@astro-v7/<name>` and add scripts for `dev`, `build`, `preview`, `type-check`, `clean` and `deploy`.
3. Import shared styles from `@astro-v7/shared/styles/global.css` in the app layout.
4. Copy the app-level `tsconfig.json` path aliases so `@/*` points to local `src/*` and `@astro-v7/shared/*` points to `../../shared/src/*`.
5. Configure `astro.config.mjs` with the same core integrations: Tailwind, Svelte, `@casoon/astro-site-files`, `@casoon/astro-structured-data`, `@casoon/astro-post-audit` and `@casoon/astro-speed-measure`.
6. Choose a unique dev port if the app should run alongside the existing apps.
7. Add root scripts such as `dev:<name>`, `build:<name>` and `preview:<name>` from the workspace root.
8. Add an optional Playwright project in `playwright.config.ts` plus tests under `e2e/<name>/`.

## Deployment

The template ships pre-configured for **Cloudflare Workers**. `pnpm deploy:starter` and `pnpm deploy:blog` each build the app and run `wrangler deploy`:

```bash
pnpm deploy:starter
pnpm deploy:blog

# or both apps at once
pnpm deploy
```

### Other platforms (Node.js, Vercel, Netlify)

Three config changes per app:

1. **Swap the adapter** in `astro.config.mjs` (`@astrojs/node`, `@astrojs/vercel`, `@astrojs/netlify`)
2. **Enable Sharp** — change image service to `'astro/assets/services/sharp'`
3. **Delete `wrangler.toml`** — not needed outside Cloudflare

## Astro v7 Highlights

- **Vite 8 + Rolldown** — Rust-based bundler, 15–61% faster builds on real-world sites
- **Rust `.astro` compiler** — Faster compilation, stricter HTML validation
- **Sätteri markdown** — GFM and heading anchors without plugins
- **`compressHTML: 'jsx'`** — Explicit whitespace mode, visible in config
- **Stable advanced routing** — No more `experimental.advancedRouting` flag
- **`@astrojs/cloudflare` v14** — Full workerd parity across dev, prerender and production
- **`astro dev --background`** — Background dev server for AI coding agents and CI workflows

## License

MIT
