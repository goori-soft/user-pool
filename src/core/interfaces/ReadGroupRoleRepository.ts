import { SavedGroupRole } from '../types/GroupRole';

export type ListOptions = {
  groupId?: string;
  limit?: number;
  page?: number;
};

export type ListResponse = {
  limit: number;
  page: number;
  total: number;
  items: SavedGroupRole[];
};

export interface ReadGroupRoleRepository {
  list(options: ListOptions): Promise<ListResponse>;
}
