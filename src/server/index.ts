import config from '~/config';
import { createMongoAdapters } from '~/factories/createMongoAdapters';
import { createApp } from './app';

async function main() {
  const adapters = await createMongoAdapters();

  const app = createApp(adapters);
  app.listen(config.port, () => {
    console.log(`Server is runing in port ${config.port}`);
  });
}

main();
