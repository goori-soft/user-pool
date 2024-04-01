import { Profile, SavedProfile } from '../types/Profile';

export interface ProfileRepository {
  save(profile: Profile): Promise<SavedProfile>;
}
