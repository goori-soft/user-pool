import z from 'zod';
import { ApplicationId } from './ApplicationId';
import { applicationValidator } from '../validators/applicationValidator';

export type Application = z.infer<typeof applicationValidator>;

export type SavedApplication = {
  id: ApplicationId;
} & Application;

export type ApplicationModifier = {
  id: ApplicationId;
} & Partial<Pick<Application, 'defaultProfile' | 'description' | 'email' | 'name' | 'url'>>;
