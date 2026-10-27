import { z } from 'zod';

// Expo вбудовує лише прямі звернення process.env.EXPO_PUBLIC_*, тому перелічуємо їх явно.
const schema = z.object({
  apiUrl: z.url(),
});

export const env = schema.parse({
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
});
