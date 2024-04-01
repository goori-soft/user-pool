import z from 'zod';
import { profileValidator } from '../validators/profileValidator';

export type Profile = z.infer<typeof profileValidator>;
