import { SavedProfile } from '../types/Profile';

export type ListOptions = {
  applicationId?: string;
  limit?: number;
  page?: number;
};

export type ListResponse = {
  limit: number;
  page: number;
  total: Number;
  items: SavedProfile[];
};

export interface ReadProfileRepository {
  list(options?: ListOptions): Promise<ListResponse>;
}
