import { Db } from 'mongodb';
import { GroupRepository } from '~/core/interfaces/GroupRepository';
import { MongoDefaultRepository } from './MongoDefaultRepository';
import { Group, SavedGroup } from '~/core/types/Group';

export class MongoGroupRepository extends MongoDefaultRepository<Group> implements GroupRepository {
  constructor(client: Db) {
    super(client, 'groups');
  }

  async getByOwner(owner: string): Promise<SavedGroup[]> {
    const collection = this.getCollection();
    const documents = await collection.find({ owner }).toArray();
    return documents.map((document) => {
      return {
        ...document,
        id: document._id.toString(),
      };
    });
  }
}
