import { Db } from 'mongodb';
import { UserRepository } from '~/core/interfaces/UserRepository';
import { MongoDefaultRepository } from './MongoDefaultRepository';
import { SavedUser, User } from '~/core/types/User';

export class MongoUserRepository extends MongoDefaultRepository<User> implements UserRepository {
  constructor(client: Db) {
    super(client, 'users');
  }

  async getByEmail(email: string): Promise<SavedUser | undefined> {
    const collection = this.getCollection();
    const document = await collection.findOne({ email });
    if (!document) return;
    return {
      ...document,
      id: document._id.toString(),
    };
  }
}
