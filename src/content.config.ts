import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/chapters' }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    part: z.enum(['warm-up', 'গল্প', 'হাতে কলমে', 'গভীরে', 'সিদ্ধান্ত', 'closing']),
    partLabel: z.string(),
    order: z.number(),
    readingTime: z.string(),
    summary: z.string(),
  }),
});

export const collections = { chapters };
