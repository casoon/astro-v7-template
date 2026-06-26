# SEO — Standards & Patterns

## Meta-Tags (jede Seite)

```astro
---
// src/components/seo/PageSEO.astro
export interface Props {
  title: string;           // max 60 Zeichen
  description: string;     // max 160 Zeichen
  ogImage?: string;        // absolute URL, 1200x630
  canonical?: string;      // absolutes URL
  noindex?: boolean;
}
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical ?? Astro.url.href} />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={Astro.url.href} />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="[Sitename]" />
<meta property="og:locale" content={Astro.currentLocale === 'en' ? 'en_US' : 'de_DE'} />

<!-- Twitter/X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

<!-- Robots -->
{noindex && <meta name="robots" content="noindex, nofollow" />}
```

## JSON-LD Schemas

### Organization (Startseite)

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Unternehmensname",
  "url": Astro.site?.href,
  "logo": `${Astro.site}logo.png`,
  "description": "Kurzbeschreibung",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@example.com",
    "availableLanguage": ["German", "English"]
  },
  "sameAs": [
    "https://linkedin.com/company/...",
    "https://twitter.com/..."
  ]
})} />
```

### LocalBusiness (Kontaktseite)

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Unternehmensname",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Musterstraße 1",
    "addressLocality": "Hamburg",
    "postalCode": "20095",
    "addressCountry": "DE"
  },
  "telephone": "+49 40 ...",
  "email": "info@example.com",
  "url": Astro.site?.href,
  "openingHours": "Mo-Fr 09:00-17:00"
})} />
```

### Article (Blog-Post)

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.data.title,
  "description": post.data.description,
  "datePublished": post.data.publishDate.toISOString(),
  "dateModified": post.data.updatedDate?.toISOString() ?? post.data.publishDate.toISOString(),
  "author": {
    "@type": "Person",
    "name": "Autor Name"
  },
  "image": ogImageUrl,
  "publisher": {
    "@type": "Organization",
    "name": "Unternehmensname",
    "logo": {
      "@type": "ImageObject",
      "url": `${Astro.site}logo.png`
    }
  }
})} />
```

### BreadcrumbList (alle Unterseiten)

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Start",
      "item": Astro.site?.href
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Aktuelle Seite",
      "item": Astro.url.href
    }
  ]
})} />
```

## Title-Formel

```
Primäres Keyword — Sekundarres Keyword | Markenname

Startseite:
  "Webdesign Hamburg — Moderne Websites | Beispiel GmbH"
  
Unterseite:
  "Kontakt aufnehmen | Beispiel GmbH Hamburg"
  
Blog-Post:
  "Wie Astro v7 die Performance verdoppelt | Beispiel Blog"

Länge: 50-60 Zeichen (gemessen)
```

## Description-Formel

```
[Nutzenversprechen]. [Handlungsaufforderung].

"Professionelle Websites für Hamburger Unternehmen. Schnell geladen, 
barrierefrei und auf Conversion optimiert. Jetzt kostenlos beraten lassen."

Länge: 120-160 Zeichen
```

## i18n SEO

```astro
<!-- Hreflang auf allen Seiten -->
<link rel="alternate" hreflang="de" href={`${Astro.site}${deUrl}`} />
<link rel="alternate" hreflang="en" href={`${Astro.site}en/${enUrl}`} />
<link rel="alternate" hreflang="x-default" href={`${Astro.site}${deUrl}`} />
```

## Sitemap

Automatisch via `@casoon/astro-site-files`. Konfiguration:

```typescript
// astro.config.ts
import casoonSiteFiles from '@casoon/astro-site-files';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    casoonSiteFiles({
      sitemap: {
        changefreq: 'weekly',
        priority: 0.7,
        exclude: ['/legal/', '/privacy/'],
      },
      robots: {
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
      },
    }),
  ],
});
```

## Robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://example.com/sitemap.xml
```

## URL-Struktur

```
Regeln:
  - Lowercase: /meine-seite (nicht /MeineSeite)
  - Bindestriche: /web-design (nicht /web_design)
  - Keine ID-Parameter: /blog/astro-v7 (nicht /blog?id=123)
  - Trailing Slash konsistent (`trailingSlash: 'always'` → mit Slash)
  - Sprechend: /leistungen/webdesign (nicht /p/123)

i18n:
  en: /                     (default, kein prefix)
  de: /de/
  en: /blog/my-post/
  de: /de/blog/mein-post/
```

## Core Web Vitals & SEO

Google nutzt Core Web Vitals als Ranking-Signal:

```
LCP < 2.5s → grün
CLS < 0.1 → grün
INP < 200ms → grün
```

LCP-Optimierung für SEO:
```astro
<!-- Hero-Bild preloaden -->
<link rel="preload" as="image" href="/hero.webp" />

<!-- LCP-Element: loading="eager" -->
<Image src={hero} alt="..." loading="eager" fetchpriority="high" />
```

## Content-Qualität

```
Checkliste für jeden Text:
[ ] Beantwortet die Suchanfrage der Zielgruppe vollständig
[ ] Primäres Keyword in H1, ersten 100 Wörtern, URL
[ ] Sekundäre Keywords natürlich eingebaut
[ ] Keine Keyword-Stuffing
[ ] Interne Links zu verwandten Seiten
[ ] Externe Links zu Quellen (wenn relevant)
[ ] Unique Content (kein Duplicate Content)
[ ] Mindestlänge je nach Typ:
    Landing Page: 800-1500 Wörter
    Blog-Post:    1200-2500 Wörter
    FAQ-Seite:    500-1000 Wörter
```
