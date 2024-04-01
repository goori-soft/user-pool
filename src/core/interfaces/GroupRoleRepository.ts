import { GroupRole, SavedGroupRole } from '../types/GroupRole';

export interface GroupRoleRepository {
  save(role: GroupRole): Promise<SavedGroupRole>;
  remove(id: string): Promise<void>;
  removeByIds(ids: string[]): Promise<void>;
}
