import { Db } from 'mongodb';
import { GroupRole } from '~/core/types/GroupRole';
import { MongoDefaultRepository } from './MongoDefaultRepository';
import { ListOptions, ListResponse, ReadGroupRoleRepository } from '~/core/interfaces/ReadGroupRoleRepository';

export class MongoReadGroupRoleRepository extends MongoDefaultRepository<GroupRole> implements ReadGroupRoleRepository {
  constructor(client: Db) {
    super(client, 'groupRoles');
  }

  async list(options: ListOptions): Promise<ListResponse> {
    const { limit = 100, page = 1, ...filter } = options;
    const skip = (Math.abs(page) - 1) * limit;
    const collection = this.getCollection();
    const response = await collection.find(filter, { limit, skip }).toArray();
    const total = await collection.countDocuments(filter);

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
