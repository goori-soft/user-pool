import { GroupRole, SavedGroupRole } from '../types/GroupRole';

export interface GroupRoleRepository {
  save(role: GroupRole): Promise<SavedGroupRole>;
}
