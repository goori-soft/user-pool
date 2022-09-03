import { IGroupFactory, IGroupRepository } from "@/userPool";
import { GroupMemoryRepository } from '@/adapters'

export class GroupMemoryFactory implements IGroupFactory{
  createRepository(): IGroupRepository {
    return new GroupMemoryRepository()
  }
}