import { IConsumerData } from "./IConsumerData"

export interface IConsumersStats {
  total: number
  active: number
  inactive: number
  consumers: IConsumerData[]
}