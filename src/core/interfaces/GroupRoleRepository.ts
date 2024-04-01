import { GroupRole, SavedGroupRole } from '../types/GroupRole';

export interface GroupRoleRepository {
  save(role: GroupRole): Promise<SavedGroupRole>;
  get(id: string): Promise<SavedGroupRole | undefined>;
  remove(id: string): Promise<void>;
  removeByIds(ids: string[]): Promise<void>;
  update(role: SavedGroupRole): Promise<SavedGroupRole>;
}
