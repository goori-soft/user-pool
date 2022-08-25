import { IConsumerFactory, IConsumerRepository } from '@/userPool'
import { ConsumerMemoryRepository } from '@/adapters'

export class ConsumerMemoryFactory implements IConsumerFactory{
  createRepository(): IConsumerRepository {
    return new ConsumerMemoryRepository()
  }
}