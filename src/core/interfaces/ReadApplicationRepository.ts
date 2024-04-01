import { SavedApplication } from '../types/Application';

export type ListOptions = {
  limit?: number;
  page?: number;
};

export type ListResponse = {
  limit: number;
  page: number;
  total: number;
  items: SavedApplication[];
};

export interface ReadApplicationRepository {
  list(options?: ListOptions): Promise<ListResponse>;
}
