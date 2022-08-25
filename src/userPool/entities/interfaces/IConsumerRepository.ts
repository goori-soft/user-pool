import { Consumer } from "../Consumer"
import { IConsumerSecrets } from "./IConsumerSecrets"

export interface IConsumerRepository{
  save: (consumer: Consumer) => Promise<IConsumerSecrets>
  findByEmail: (email: string) => Promise<Consumer[]>
  findById: (id: string) => Promise<Consumer>
  getAll: ()=>Promise<Consumer[]>
}