import { Application, SavedApplication } from '../types/Application';

export interface ApplicationRepository {
  save(application: Application): Promise<SavedApplication>;
}
