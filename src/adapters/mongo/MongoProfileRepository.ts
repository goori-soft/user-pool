import { Db, ObjectId } from 'mongodb';
import { ProfileRepository } from '~/core/interfaces/ProfileRepository';
import { MongoDefaultRepository } from './MongoDefaultRepository';
import { Profile } from '~/core/types/Profile';

export class MongoProfileRepository extends MongoDefaultRepository<Profile> implements ProfileRepository {
  constructor(client: Db) {
    super(client, 'profiles');
  }

  async removeByIds(ids: string[]): Promise<void> {
    const collection = this.getCollection();
    const _ids = ids.map((id) => new ObjectId(id));
    await collection.deleteMany({ _id: { $in: _ids } });
    return;
  }
}
