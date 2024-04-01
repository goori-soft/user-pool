import { Profile, SavedProfile } from '../types/Profile';

export interface ProfileRepository {
  save(profile: Profile): Promise<SavedProfile>;
  get(id: string): Promise<SavedProfile | undefined>;
  remove(id: string): Promise<void>;
  removeByIds(ids: string[]): Promise<void>;
  update(profile: SavedProfile): Promise<SavedProfile>;
}
