import { MongoClient } from 'mongodb';
import { ListOptions, ListResponse, ReadApplicationRepository } from '~/core/interfaces/ReadApplicationRepository';
import { Application } from '~/core/types/Application';
import { MongoDefaultRepository } from './MongoDefaultRepository';

export class MongoReadApplicationRepository
  extends MongoDefaultRepository<Application>
  implements ReadApplicationRepository
{
  constructor(client: MongoClient) {
    super(client, 'applications');
  }

  async list(options?: ListOptions): Promise<ListResponse> {
    const collection = this.getCollection();
    const { limit = 100, page = 1 } = options ?? {};
    const skip = (Math.abs(page) - 1) * limit;
    const total = await collection.countDocuments({}, { hint: '_id_' });
    const result = await collection.find({}, { limit, skip }).toArray();
    return {
      limit,
      page,
      total,
      items: result.map((item) => {
        const id = item._id.toString();
        return {
          ...item,
          id,
        };
      }),
    };
  }
}
