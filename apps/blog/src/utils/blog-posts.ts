import { type Locale, locales } from '@astro-v7/shared/utils/i18n';
import { type CollectionEntry, getCollection } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** Posts live in one folder per locale: `src/content/blog/<locale>/<slug>.mdx` → id `<locale>/<slug>`. */
export function getPostSlug(post: BlogPost): string {
  return post.id.slice(post.id.indexOf('/') + 1);
}

/**
 * Every published post must exist in every locale: the sitemap pairs hreflang alternates by
 * slug, so a missing translation would advertise a URL that 404s. Fails the build instead.
 */
async function assertTranslationsComplete(): Promise<void> {
  const posts = await getCollection('blog', (post: BlogPost) => !post.data.draft);
  const published = new Set(posts.map((post: BlogPost) => post.id));
  const slugs = new Set(posts.map(getPostSlug));
  const missing = [...slugs].flatMap((slug) =>
    locales.map((locale) => `${locale}/${slug}`).filter((id) => !published.has(id))
  );
  if (missing.length > 0) {
    throw new Error(
      `Blog posts missing a translation (add or set draft: true in all locales): ${missing.join(', ')}`
    );
  }
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const posts = await getCollection(
    'blog',
    (post: BlogPost) => post.id.startsWith(`${locale}/`) && !post.data.draft
  );
  return posts.sort((a: BlogPost, b: BlogPost) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getBlogPostStaticPaths(locale: Locale) {
  await assertTranslationsComplete();
  const posts = await getBlogPosts(locale);
  return posts.map((post: BlogPost) => ({
    params: { slug: getPostSlug(post) },
    props: { post },
  }));
}
