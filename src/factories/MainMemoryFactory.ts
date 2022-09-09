import { ConsumerMemoryRepository, GroupMemoryRepository, PolicyMemoryRepository, ProfileMemoryRepository } from "@/adapters";
import { UserMemoryRepository } from "@/adapters/UseremoryRepository";
import { IConsumerRepository, IGroupRepository, IMainFactory, IPolicyRepository, IProfileRepository, IUserRepository } from "@/userPool";

export class MainMemoryFactory implements IMainFactory{
  createConsumerRepository(): IConsumerRepository {
    return new ConsumerMemoryRepository()
  }
  createGroupRepository(): IGroupRepository {
    return new GroupMemoryRepository()
  }
  createPolicyRepository(): IPolicyRepository {
    return new PolicyMemoryRepository()
  }
  createProfileRepository(): IProfileRepository {
    return new ProfileMemoryRepository()
  }
  createUserRepository(): IUserRepository {
    return new UserMemoryRepository()
  }
}