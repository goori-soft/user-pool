import { IConsumerFactory } from "./IConsumerFactory";
import { IGroupFactory } from "./IGroupFactory";

export interface IMainFactory{
  createConsumerFactory(): IConsumerFactory
  createGroupFactory(): IGroupFactory
}