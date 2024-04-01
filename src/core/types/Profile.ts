import z from 'zod';
import { profileValidator } from '../validators/profileValidator';

export type Profile = z.infer<typeof profileValidator>;

export type SavedProfile = {
  id: string;
} & Profile;

export type ProfileModifier = {
  id: string;
} & Partial<Pick<Profile, 'name' | 'description' | 'resources'>>;
