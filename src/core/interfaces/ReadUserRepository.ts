import { SavedUser } from '../types/User';

export type ListOptions = {
  applicationId?: string;
  profileId?: string | string[];
  groupId?: string | string[];
  groupRoleId?: string | string[];
  limit?: number;
  page?: number;
};

export type ListResponse = {
  limit: number;
  page: number;
  total: number;
  items: SavedUser[];
};

export interface ReadUserRepository {
  list(options: ListOptions): Promise<ListResponse>;
}
