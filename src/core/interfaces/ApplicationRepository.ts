import { Application, SavedApplication } from '../types/Application';

export interface ApplicationRepository {
  save(application: Application): Promise<SavedApplication>;
  getByEmail(email: string): Promise<SavedApplication | undefined>;
  get(id: string): Promise<SavedApplication | undefined>;
  remove(id: string): Promise<void>;
  update(application: SavedApplication): Promise<SavedApplication>;
}
