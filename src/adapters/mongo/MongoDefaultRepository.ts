import { MongoClient, Collection } from 'mongodb';

export class MongoDefaultRepository<T extends {}> {
  constructor(
    private readonly client: MongoClient,
    private collectionName: string,
  ) {}

  public getCollection(): Collection<T> {
    return this.client.db().collection<T>(this.collectionName);
  }
}
