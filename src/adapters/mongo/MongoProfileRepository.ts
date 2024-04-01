import { Collection, MongoClient, ObjectId } from 'mongodb';
import { ProfileRepository } from '~/core/interfaces/ProfileRepository';
import { MongoDefaultRepository } from './MongoDefaultRepository';
import { Profile, SavedProfile } from '~/core/types/Profile';

export class MongoProfileRepository extends MongoDefaultRepository<Profile> implements ProfileRepository {
  constructor(client: MongoClient) {
    super(client, 'profiles');
  }

  async get(id: string): Promise<SavedProfile | undefined> {
    const collection = this.getCollection();
    const _id = new ObjectId(id);
    const savedProfile = await collection.findOne({ _id });

    if (!savedProfile) return;

    return {
      ...savedProfile,
      id,
    };
  }

  async save(profile: Profile): Promise<SavedProfile> {
    const collection = this.getCollection();
    const result = await collection.insertOne(profile);
    return {
      ...profile,
      id: result.insertedId.toString(),
    };
  }

  async remove(id: string): Promise<void> {
    const collection = this.getCollection();
    const _id = new ObjectId(id);
    await collection.deleteOne({ _id });
  }

  async removeByIds(ids: string[]): Promise<void> {
    const collection = this.getCollection();
    const _ids = ids.map((id) => new ObjectId(id));
    await collection.deleteMany({ _id: { $in: _ids } });
    return;
  }

  async update(profile: SavedProfile): Promise<SavedProfile> {
    const collection = this.getCollection();
    const _id = new ObjectId(profile.id);
    await collection.updateOne({ _id }, profile);
    return { ...profile };
  }
}
