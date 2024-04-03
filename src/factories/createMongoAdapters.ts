import config from '~/config';
import { MongoClientOptions } from '~/adapters/mongo/types/MongoClientOptions';
import { createClient } from '~/adapters/mongo/createClient';
import { MongoApplicationRepository } from '~/adapters/mongo/MongoApplicationRepository';
import { SysLogger } from '~/adapters/sys/SysLogger';
import { SysPasswordEncoder } from '~/adapters/sys/SysPasswordEncoder';
import { MongoProfileRepository } from '~/adapters/mongo/MongoProfileRepository';
import { MongoUserRepository } from '~/adapters/mongo/MongoUserRepository';
import { MongoGroupRepository } from '~/adapters/mongo/MongoGroupRepository';
import { MongoGroupRoleRepository } from '~/adapters/mongo/MongoGroupRoleRepository';
import { MongoReadUserRepository } from '~/adapters/mongo/MongoReadUserRepository';
import { MongoReadGroupRepository } from '~/adapters/mongo/MongoReadGroupRepository';
import { MongoReadApplicationRepository } from '~/adapters/mongo/MongoReadApplicationRepository';
import { MongoReadGroupRoleRepository } from '~/adapters/mongo/MongoReadGroupRoleRepository';
import { MongoReadProfileRepository } from '~/adapters/mongo/MongoReadProfileRepository';
import { AdaptersCollection } from './types/AdaptersCollection';

export async function createMongoAdapters(): Promise<AdaptersCollection> {
  const options: MongoClientOptions = {
    host: process.env.MONGO_HOST ?? '',
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    srv: Boolean(process.env.MONGO_SRV),
    db: process.env.MONGO_DB,
    port: process.env.MONGO_PORT,
  };

  const client = await createClient(options);
  const applicationRepository = new MongoApplicationRepository(client);
  const profileRepository = new MongoProfileRepository(client);
  const userRepository = new MongoUserRepository(client);
  const groupRepository = new MongoGroupRepository(client);
  const groupRoleRepository = new MongoGroupRoleRepository(client);
  const readUserRepository = new MongoReadUserRepository(client, { applicationRepository });
  const readGroupRepository = new MongoReadGroupRepository(client);
  const readApplicationRepository = new MongoReadApplicationRepository(client);
  const readGroupRoleRepository = new MongoReadGroupRoleRepository(client);
  const readProfileRepository = new MongoReadProfileRepository(client);

  const logger = new SysLogger();

  const passwordOptions = {
    secret: config.secret,
  };
  const passwordEncoder = new SysPasswordEncoder(passwordOptions);

  return {
    applicationRepository,
    profileRepository,
    userRepository,
    groupRepository,
    groupRoleRepository,
    logger,
    passwordEncoder,

    readAdapters: {
      applicationRepository: readApplicationRepository,
      profileRepository: readProfileRepository,
      userRepository: readUserRepository,
      groupRepository: readGroupRepository,
      groupRoleRepository: readGroupRoleRepository,
      logger,
      passwordEncoder,
    },
  };
}
