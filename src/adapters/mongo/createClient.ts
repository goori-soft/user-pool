import { MongoClient, Db } from 'mongodb';
import { MongoClientOptions } from './types/MongoClientOptions';
import { createUrlFromOptions } from './createUrlFromOptions';

export async function createClient(options: MongoClientOptions): Promise<Db> {
  const url = createUrlFromOptions(options);
  console.log('Connecting to ', url);
  const client = new MongoClient(url);
  const connection = await client.connect();
  const db = connection.db(options.db);
  return db;
}
