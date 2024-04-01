import z from 'zod';
import { groupValidator } from '../validators/groupValidator';

export type Group = z.infer<typeof groupValidator>;

export type SavedGroup = {
  id: string;
} & Group;

export type GroupModifier = {
  id: string;
} & Partial<Pick<Group, 'name' | 'description' | 'owner'>>;
