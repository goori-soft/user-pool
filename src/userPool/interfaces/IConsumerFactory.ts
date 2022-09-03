import {IConsumerRepository} from './IConsumerRepository'

export interface IConsumerFactory {
  createRepository(): IConsumerRepository
}