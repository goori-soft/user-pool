import { Group, SavedGroup } from '../types/Group';

export interface GroupRepository {
  save(group: Group): Promise<SavedGroup>;
  get(id: string): Promise<SavedGroup | undefined>;
  getByOwner(userId: string): Promise<SavedGroup[]>;
  remove(id: string): Promise<void>;
}
