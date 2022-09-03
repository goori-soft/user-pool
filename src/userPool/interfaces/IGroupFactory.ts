import { IGroupRepository } from "./IGroupRepository";

export interface IGroupFactory{
  createRepository(): IGroupRepository
}