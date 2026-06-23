export const prerender = true;

import rss from '@astrojs/rss';
import { env } from '../env.ts';
import { type CollectionEntry, getCollection } from 'astro:content';

const SITE = env.PUBLIC_SITE_URL;
const NS = `${SITE}/feed/ns/`;

export async function GET() {
  const posts = await getCollection('blog', (entry: CollectionEntry<'blog'>) => !entry.data.draft);
  const sorted = posts.sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => {
    const da = new Date(a.data.lastmod ?? a.data.date).getTime();
    const db = new Date(b.data.lastmod ?? b.data.date).getTime();
    return db - da;
  });

  return rss({
    title: env.PUBLIC_SITE_NAME,
    description: 'A blog template built with Astro v7, MDX and Content Collections.',
    site: new URL(SITE),
    xmlns: { article: NS },
    customData: [
      `<language>${env.PUBLIC_LOCALE}</language>`,
      `<copyright>Copyright ${new Date().getFullYear()} ${env.PUBLIC_SITE_NAME}</copyright>`,
      `<managingEditor>${env.PUBLIC_AUTHOR}</managingEditor>`,
    ].join('\n'),
    items: sorted.map((post: CollectionEntry<'blog'>) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.lastmod ?? post.data.date),
      link: `/blog/${post.id}/`,
      author: post.data.author,
      categories: post.data.tags,
      customData: [
        `<enclosure url="${SITE}/og/blog/${post.id}.png" length="0" type="image/png" />`,
        post.data.readTime
          ? `<article:readingTime>${post.data.readTime} min</article:readingTime>`
          : '',
        post.data.series ? `<article:series>${post.data.series}</article:series>` : '',
        post.data.seriesOrder
          ? `<article:seriesOrder>${post.data.seriesOrder}</article:seriesOrder>`
          : '',
      ]
        .filter(Boolean)
        .join('\n'),
    })),
  });
}
