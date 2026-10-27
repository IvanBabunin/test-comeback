import { z } from 'zod';

// Swagger у mockapi немає, тому схема описана тут і валідує відповідь на межі з API.
export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  date: z.string(),
  location: z.string(),
  price: z.number(),
  imageUrl: z
    .string()
    .nullish()
    .transform((url) => (url?.trim() ? url : undefined)),
  isFavorite: z.boolean(),
  isFeatured: z.boolean(),
});

export type Event = z.infer<typeof eventSchema>;
