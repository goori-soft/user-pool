import { SavedUser, User } from '../types/User';

export interface UserRepository {
  save(user: User): Promise<SavedUser>;
  get(id: string): Promise<SavedUser | undefined>;
  getByEmail(email: string): Promise<SavedUser | undefined>;
  remove(id: string): Promise<void>;
  update(user: SavedUser): Promise<SavedUser>;
}
