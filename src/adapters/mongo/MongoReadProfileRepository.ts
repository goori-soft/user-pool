import { Db } from 'mongodb';
import { ListOptions, ListResponse, ReadProfileRepository } from '~/core/interfaces/ReadProfileRepository';
import { MongoDefaultRepository } from './MongoDefaultRepository';
import { Profile } from '~/core/types/Profile';

export class MongoReadProfileRepository extends MongoDefaultRepository<Profile> implements ReadProfileRepository {
  constructor(client: Db) {
    super(client, 'profiles');
  }

  async list(options?: ListOptions | undefined): Promise<ListResponse> {
    const collection = this.getCollection();
    const { limit = 100, page = 1, ...filter } = options ?? {};
    const skip = (Math.abs(page) - 1) * limit;
    const total = 0;
    const result = await collection.find(filter, { limit, skip }).toArray();
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
