import { MongoClient, Collection, ObjectId } from 'mongodb';
import { ApplicationRepository } from '~/core/interfaces/ApplicationRepository';
import { SavedApplication, Application } from '~/core/types/Application';
import { MongoDefaultRepository } from './MongoDefaultRepository';

export class MongoApplicationRepository extends MongoDefaultRepository<Application> implements ApplicationRepository {
  constructor(client: MongoClient) {
    super(client, 'applications');
  }

  async get(id: string): Promise<SavedApplication | undefined> {
    const collection = this.getCollection();
    const _id = new ObjectId(id);
    const foundApplication = await collection.findOne({ _id });
    if (!foundApplication) return;
    return {
      ...foundApplication,
      id: foundApplication._id.toString(),
    };
  }

  async getByEmail(email: string): Promise<SavedApplication | undefined> {
    const collection = this.getCollection();
    const foundApplication = await collection.findOne({ email });
    if (!foundApplication) return;
    return {
      ...foundApplication,
      id: foundApplication._id.toString(),
    };
  }

  async remove(id: string): Promise<void> {
    const collection = this.getCollection();
    const _id = new ObjectId(id);
    await collection.deleteOne({ _id });
    return;
  }

  async save(application: Application): Promise<SavedApplication> {
    const collection = this.getCollection();
    const result = await collection.insertOne(application);

    return {
      ...application,
      id: result.insertedId.toString(),
    };
  }

  async update(application: SavedApplication): Promise<SavedApplication> {
    const collection = this.getCollection();
    const _id = new ObjectId(application.id);
    await collection.updateOne({ _id }, application);
    return { ...application };
  }
}
