import { IConsumerRepository } from "./IConsumerRepository";
import { IGroupRepository } from "./IGroupRepository";
import { IPolicyRepository } from "./IPolicyRepository";
import { IProfileRepository } from "./IProfileRepository";
import { IUserRepository } from "./IUserRepository";

export interface IMainFactory{
  createConsumerRepository(): IConsumerRepository
  createGroupRepository(): IGroupRepository
  createPolicyRepository(): IPolicyRepository
  createProfileRepository(): IProfileRepository
  createUserRepository(): IUserRepository
}