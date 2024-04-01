import z from 'zod';
import { groupRoleValidator } from '../validators/groupRoleValidator';

export type GroupRole = z.infer<typeof groupRoleValidator>;

export type SavedGroupRole = {
  id: string;
} & GroupRole;
