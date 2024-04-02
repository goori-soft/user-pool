import { MongoClient, ObjectId } from 'mongodb';
import { ApplicationRepository } from '~/core/interfaces/ApplicationRepository';
import { SavedApplication, Application } from '~/core/types/Application';
import { MongoDefaultRepository } from './MongoDefaultRepository';

export class MongoApplicationRepository extends MongoDefaultRepository<Application> implements ApplicationRepository {
  constructor(client: MongoClient) {
    super(client, 'applications');
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
}
