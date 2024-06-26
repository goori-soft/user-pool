import z from 'zod';

export const userValidator = z.object({
  name: z.string().min(3, 'User name should have at least 3 chars'),
  email: z.string().email('User email should be a valid email'),
  bio: z.string().optional(),

  password: z.string().optional(),

  profiles: z.string().array().optional(),
  roles: z.string().array().optional(),
});
