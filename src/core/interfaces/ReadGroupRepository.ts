import { SavedGroup } from '../types/Group';

export type ListOptions = {
  applicationId?: string;
  limit?: number;
  page?: number;
};

export type ListResponse = {
  limit: number;
  page: number;
  total: number;
  items: SavedGroup[];
};

export interface ReadGroupRepository {
  list(options: ListOptions): Promise<ListResponse>;
}
