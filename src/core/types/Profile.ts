import z from 'zod';
import { profileValidator } from '../validators/profileValidator';

export type Profile = z.infer<typeof profileValidator>;

export type SavedProfile = {
  id: string;
} & Profile;
