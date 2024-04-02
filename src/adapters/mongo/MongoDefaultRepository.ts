import { MongoClient, Collection, ObjectId, OptionalUnlessRequiredId, WithId } from 'mongodb';

type Saved<T extends {}> = T & { id: string };

export class MongoDefaultRepository<T extends {}> {
  constructor(
    private readonly client: MongoClient,
    private collectionName: string,
  ) {}

  public getCollection(): Collection<T> {
    return this.client.db().collection<T>(this.collectionName);
  }

  async get(id: string): Promise<Saved<T> | undefined> {
    const collection = this.getCollection() as unknown as Collection<WithId<{}>>;
    const _id = new ObjectId(id);
    const savedDocument = await collection.findOne({ _id });
    if (!savedDocument) return;
    return {
      ...savedDocument,
      id,
    } as unknown as Saved<T>;
  }

  async save(document: OptionalUnlessRequiredId<T>): Promise<Saved<T>> {
    const collection = this.getCollection();
    const savedDocument = await collection.insertOne(document);
    return {
      ...document,
      id: savedDocument.insertedId.toString(),
    } as Saved<T>;
  }

  async update(document: Saved<T>): Promise<Saved<T>> {
    const collection = this.getCollection() as unknown as Collection<{}>;
    const _id = new ObjectId(document.id);
    await collection.updateOne({ _id }, document);
    return { ...document };
  }

  async remove(id: string): Promise<void> {
    const collection = this.getCollection() as unknown as Collection;
    const _id = new ObjectId(id);
    await collection.deleteOne({ _id });
    return;
  }
}
