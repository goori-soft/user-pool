import { Policy } from "../entities/Policy";

export interface IPolicyRepository{
  insert(policy: Policy): Promise<string>
  clean(): Promise<void>
}