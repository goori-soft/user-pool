import { IConsumerRepository } from "../interfaces";
import { ConsumersStats } from '../types'

type getConsumersStatsOptions = {
  consumerRepository: IConsumerRepository
}

export default async function  getConsumersStats(options: getConsumersStatsOptions): Promise<ConsumersStats>{
  const consumerRepository = options.consumerRepository
  const consumers = await consumerRepository.getAll()
  const consumersData = consumers.map((consumer)=>{
    return consumer.getData()
  })
  const total = consumers.length
  const active = total
  const inactive = 0

  return {
    total,
    active,
    inactive,
    consumers: consumersData
  }
}