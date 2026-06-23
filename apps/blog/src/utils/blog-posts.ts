import { type CollectionEntry, getCollection } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getBlogPostStaticPaths() {
  const posts = (await getCollection('blog')).filter((post: BlogPost) => !post.data.draft);
  return posts.map((post: BlogPost) => ({
    params: { slug: post.id },
    props: { post },
  }));
}
