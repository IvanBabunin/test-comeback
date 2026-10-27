import { z } from 'zod';

// message — ключ перекладу, його показує FormInput через t().
export const loginSchema = z.object({
  email: z.email({ message: 'auth:errors.emailInvalid' }),
  password: z.string().min(8, { message: 'auth:errors.passwordShort' }),
});

export type LoginForm = z.infer<typeof loginSchema>;
