import { MongoClientOptions } from './types/MongoClientOptions';

export function createUrlFromOptions(options: MongoClientOptions): string {
  const { user, pass, host, port, srv } = options;
  const srvString = srv ? '+srv' : '';
  const protocol = `mongodb${srvString}://`;
  const atSign = user ? '@' : '';
  const passString = user && pass ? `:${pass}` : '';
  const portString = port ? `:${port?.toString()}` : '';

  const url = `${protocol}${user ?? ''}${passString}${atSign}${host}${portString}`;
  return url;
}
