import { ApplicationId } from './ApplicationId';
import { Profile } from './Profile';

export type Application = {
  profiles: Profile[];
};

export type SavedApplication = {
  id: ApplicationId;
} & Application;
