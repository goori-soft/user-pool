import z from 'zod';

export const profileValidator = z.object({
  applicationId: z.string(),
  name: z.string(),
  description: z.string().optional(),
});
