import { MongoClient, ObjectId } from 'mongodb';
import { GroupRole } from '~/core/types/GroupRole';
import { MongoDefaultRepository } from './MongoDefaultRepository';
import { GroupRoleRepository } from '~/core/interfaces/GroupRoleRepository';

export class MongoGroupRoleRepository extends MongoDefaultRepository<GroupRole> implements GroupRoleRepository {
  constructor(client: MongoClient) {
    super(client, 'groupRoles');
  }

  async removeByIds(ids: string[]): Promise<void> {
    const collection = this.getCollection();
    const _ids = ids.map((id) => new ObjectId(id));
    await collection.deleteMany({ _id: { $in: _ids } });
    return;
  }
}
