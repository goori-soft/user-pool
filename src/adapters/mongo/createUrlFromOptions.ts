import { MongoClientOptions } from './types/MongoClientOptions';

export function createUrlFromOptions(options: MongoClientOptions): string {
  const { user, pass, host, port, db, srv } = options;
  const srvString = srv ? '+srv' : '';
  const protocol = `mongodb${srvString}://`;
  const atSign = user ? '@' : '';
  const passString = user && pass ? `:${pass}` : '';
  const portString = port ? `:${port?.toString()}` : '';
  const dbString = db ? `/${db}` : '';

  const url = `${protocol}${user ?? ''}${passString}${atSign}${host}${portString}${dbString}`;
  return url;
}
