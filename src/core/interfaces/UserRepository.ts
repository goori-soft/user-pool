import { SavedUser, User } from '../types/User';

export interface UserRepository {
  save(user: User): Promise<SavedUser>;
  getByEmail(email: string): Promise<SavedUser | undefined>;
}
