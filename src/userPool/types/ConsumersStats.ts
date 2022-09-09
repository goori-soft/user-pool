import { ConsumerData } from './ConsumerData'

export type ConsumersStats = {
  total: number,
  active: number,
  inactive: number,
  consumers: ConsumerData[]
}