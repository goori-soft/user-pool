import { AccessKey } from "../entities/AccessKey"

export interface IConsumerSecrets {
  id: string
  secret: string
  accessKey: AccessKey
}