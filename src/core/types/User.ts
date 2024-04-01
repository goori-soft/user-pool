import z from 'zod';
import { userValidator } from '../validators/userValidator';

export type User = z.infer<typeof userValidator>;

export type SavedUser = {
  id: string;
} & User;
