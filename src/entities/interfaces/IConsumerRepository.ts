import { IConsumerPayload } from "./IConsumerPayload"
export interface IConsumerRepository{
  save: (consumerPayload: IConsumerPayload) => Promise<string>
}