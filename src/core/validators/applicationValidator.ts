import z from 'zod';
import { profileValidator } from './profileValidator';

export const applicationValidator = z.object({
  name: z.string().min(1, 'Application name ca not be empty'),
  description: z.string().optional(),
  url: z.string().url('Application url must be a valid url'),
  profiles: profileValidator.optional().array(),
});
