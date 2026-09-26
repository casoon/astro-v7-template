import type { Locale } from '@astro-v7/shared/utils/i18n';
import { type CollectionEntry, getCollection } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** Posts live in one folder per locale: `src/content/blog/<locale>/<slug>.mdx` → id `<locale>/<slug>`. */
export function getPostSlug(post: BlogPost): string {
  return post.id.slice(post.id.indexOf('/') + 1);
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const posts = await getCollection(
    'blog',
    (post: BlogPost) => post.id.startsWith(`${locale}/`) && !post.data.draft
  );
  return posts.sort((a: BlogPost, b: BlogPost) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getBlogPostStaticPaths(locale: Locale) {
  const posts = await getBlogPosts(locale);
  return posts.map((post: BlogPost) => ({
    params: { slug: getPostSlug(post) },
    props: { post },
  }));
}
