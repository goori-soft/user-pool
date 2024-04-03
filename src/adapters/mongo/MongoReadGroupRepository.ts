import { Db } from 'mongodb';
import { ListOptions, ListResponse, ReadGroupRepository } from '~/core/interfaces/ReadGroupRepository';
import { Group } from '~/core/types/Group';
import { MongoDefaultRepository } from './MongoDefaultRepository';

export class MongoReadGroupRepository extends MongoDefaultRepository<Group> implements ReadGroupRepository {
  constructor(client: Db) {
    super(client, 'groups');
  }

  async list(options: ListOptions): Promise<ListResponse> {
    const { limit = 100, page = 1, ...filter } = options;
    const skip = (Math.abs(page) - 1) * limit;
    const collection = this.getCollection();
    const total = await collection.countDocuments(filter);
    const response = await collection.find(filter, { limit, skip }).toArray();
    return {
      limit,
      page,
      total,
      items: response.map((document) => {
        return {
          ...document,
          id: document._id.toString(),
        };
      }),
    };
  }
}
