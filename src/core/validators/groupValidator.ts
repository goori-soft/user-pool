import z from 'zod';

export const groupValidator = z.object({
  applicationId: z.string(),
  name: z.string().min(1, 'Group name can not be empty'),
  description: z.string(),
  owner: z.string(),
  roles: z.string().array().optional(),
});
