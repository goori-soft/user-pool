import { Consumer } from '../entities/Consumer'
import { ConsumerSecrets } from '../types'

export interface IConsumerRepository{
  insert: (consumer: Consumer) => Promise<ConsumerSecrets>
  findByEmail: (email: string) => Promise<Consumer[]>
  findById: (id: string) => Promise<Consumer>
  getAll: ()=>Promise<Consumer[]>
}