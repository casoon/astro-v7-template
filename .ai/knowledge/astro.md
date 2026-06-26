# Astro v7 — Internes Wissen

## Breaking Changes v7

| Alt (v6) | Neu (v7) |
|----------|----------|
| `entry.render()` | `render(entry)` (import aus `astro:content`) |
| `getEntryBySlug()` | `getEntry()` |
| `entry.slug` | `entry.id` |
| `src/content/config.ts` | `src/content.config.ts` |
| `<ViewTransitions />` | `<ClientRouter />` |
| `Astro.glob()` | `import.meta.glob()` |
| `import { z } from 'astro:content'` | `import { z } from 'astro/zod'` |
| `compressHTML: true` | `compressHTML: 'jsx'` (neuer Default) |
| `remark-gfm` manuell | GFM built-in (Sätteri) |
| `rehype-slug` manuell | Heading IDs built-in (Sätteri) |

## Reservierte Dateinamen

`src/fetch.ts` — reserviert für Advanced Routing. Umbenennen wenn vorhanden.

## Compiler-Strenge

Der Rust Compiler prüft unclosed HTML Tags. Alle non-void Elemente müssen geschlossen sein:
```html
<!-- ✅ -->
<div></div>
<p>Text</p>

<!-- ❌ Fehler in v7 -->
<div>
<p>Text
```

## Whitespace zwischen Inline-Elementen

`compressHTML: 'jsx'` (Default) kann Whitespace zwischen Inline-Elementen entfernen.
```astro
<!-- Workaround wenn Leerzeichen nötig -->
<span>Wort</span>{" "}<span>Wort</span>
```

## Content Collections

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
```

```astro
---
import { getCollection, getEntry, render } from 'astro:content';

// Alle Posts (ohne Drafts)
const posts = await getCollection('posts', ({ data }) => !data.draft);

// Einzelner Post
const entry = await getEntry('posts', Astro.params.id);

// Rendern (v7: render() nicht entry.render())
const { Content, headings } = await render(entry);
---
<Content />
```

## Astro Actions

```typescript
// src/actions/contact.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

export const submitContactForm = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.email(),        // Zod v4
    message: z.string().min(10),
  }),
  handler: async (input, context) => {
    // Server-side
    return { success: true };
  },
});
```

```astro
---
import { actions } from 'astro:actions';
const result = Astro.getActionResult(actions.submitContactForm);
---
<form method="POST" action={actions.submitContactForm}>
  <!-- ... -->
</form>
```

## i18n

```typescript
// astro.config.ts
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'de'],
  routing: {
    prefixDefaultLocale: false,  // en: /, de: /de/
  },
}
```

```typescript
// src/i18n/index.ts
export function useTranslations(locale: string) {
  const translations = locale === 'en' ? en : de;
  return (key: NestedKeyOf<typeof translations>) => get(translations, key);
}
```

## Sätteri Markdown

Neuer Default-Prozessor in v7. Built-in:
- GFM (GitHub Flavored Markdown) — **kein** `remark-gfm` nötig
- Heading IDs — **kein** `rehype-slug` nötig

Beide Plugins nicht mehr installieren — sie verursachen Doppelverarbeitung.

## ClientRouter (View Transitions)

```astro
---
import { ClientRouter } from 'astro:transitions';
---
<head>
  <ClientRouter />
</head>
```

Script-Pitfalls:
- `astro:page-load` + `data-astro-rerun` **nicht** kombinieren (doppelte Ausführung)
- `classList.add('a b')` → `classList.add('a', 'b')` (separate Argumente)

## Zod v4 (in diesem Projekt)

```typescript
// ✅ Zod v4
z.email()
z.url()
z.uuid()
z.int()
z.float()

// ❌ Zod v3 Syntax (nicht kompatibel)
z.string().email()
z.string().url()
```

## site-files

```typescript
// Ersetzt @casoon/astro-sitemap + @casoon/astro-crawler-policy
import casoonSiteFiles from '@casoon/astro-site-files';

export default defineConfig({
  integrations: [casoonSiteFiles()],
});
```

## Icons

```
Verwende: @lucide/svelte
Nicht:    lucide-svelte (deprecated)
```

```svelte
<script>
  import { ArrowRight, Check } from '@lucide/svelte';
</script>
<ArrowRight size={20} />
```
