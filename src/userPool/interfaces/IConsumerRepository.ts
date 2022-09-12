import { Consumer } from '../entities/Consumer'
import { ConsumerSecrets } from '../types'

export interface IConsumerRepository{
  insert: (consumer: Consumer) => Promise<ConsumerSecrets>
  getByEmail: (email: string) => Promise<Consumer[]>
  getById: (id: string) => Promise<Consumer | undefined>
  getAll: ()=>Promise<Consumer[]>
}