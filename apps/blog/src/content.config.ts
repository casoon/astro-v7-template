import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(10).max(160),
    titleDe: z.string().min(1).max(100).optional(),
    descriptionDe: z.string().min(10).max(160).optional(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    author: z.string().default('Astro v7 Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    readTime: z.number().optional(),
    articleType: z
      .enum(['guide', 'informative', 'technical', 'opinion', 'analysis', 'news'])
      .default('informative'),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

export const collections = { blog };
