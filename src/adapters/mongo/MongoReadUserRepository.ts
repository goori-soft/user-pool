import { Db, ObjectId } from 'mongodb';
import { ListOptions, ListResponse, ReadUserRepository } from '~/core/interfaces/ReadUserRepository';
import { ApplicationRepository } from '~/core/interfaces/ApplicationRepository';
import { User } from '~/core/types/User';
import { Group } from '~/core/types/Group';
import { MongoDefaultRepository } from './MongoDefaultRepository';
import { toArray } from './toArray';

export type MongoReadUserRepositoryAdapters = {
  applicationRepository: ApplicationRepository;
};

export class MongoReadUserRepository extends MongoDefaultRepository<User> implements ReadUserRepository {
  private applicationRepository: ApplicationRepository;

  constructor(client: Db, adapters: MongoReadUserRepositoryAdapters) {
    super(client, 'users');
    this.applicationRepository = adapters.applicationRepository;
  }

  async list(options: ListOptions): Promise<ListResponse> {
    const { limit = 100, page = 1, applicationId, groupId, ...filter } = options;
    const skip = (Math.abs(page) - 1) * limit;
    const collection = this.getCollection();

    if (applicationId) {
      const application = await this.applicationRepository.get(applicationId);
      if (application) filter.profileId = application.profiles;
    }

    if (groupId) {
      const client = this.getClient();
      const groupCollection = client.collection<Group>('groups');
      const groupIds = toArray(groupId) as string[];
      const _groupIds = groupIds.map((id) => new ObjectId(id));
      const groups = await groupCollection.find({ _id: { $in: _groupIds } }).toArray();
      const roles = new Set<string>();
      groups.forEach((group) => {
        const groupRoles = group.roles;
        groupRoles?.forEach((role) => roles.add(role));
      });
      filter.groupRoleId = [...roles];
    }

    const response = await collection
      .find(
        { profiles: { $all: toArray(filter.profileId) }, groupRoles: { $in: toArray(filter.groupRoleId) } },
        { limit, skip },
      )
      .toArray();

    return {
      limit,
      page,
      total: 0,
      items: response.map((item) => {
        return {
          ...item,
          id: item._id.toString(),
        };
      }),
    };
  }
}
