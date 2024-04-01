import z from 'zod';

export const groupRoleValidator = z.object({
  name: z.string().min(1, 'Group role name can not be empty'),
  description: z.string(),
  groupId: z.string(),
  resources: z.string().array().optional(),
});
