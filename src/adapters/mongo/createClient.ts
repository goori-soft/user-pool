import { MongoClient } from 'mongodb';
import { MongoClientOptions } from './types/MongoClientOptions';
import { createUrlFromOptions } from './createUrlFromOptions';

export async function createClient(options: MongoClientOptions) {
  const url = createUrlFromOptions(options);
  const client = new MongoClient(url);
  const connection = await client.connect();
  return connection;
}
