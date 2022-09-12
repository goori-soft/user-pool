import { User } from "../entities";

export interface IUserRepository{
  insert(user: User): Promise<string>
  getByEmail(email: string): Promise<User | undefined>
  clean(): Promise<void>
}