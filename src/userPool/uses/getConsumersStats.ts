import { IConsumerFactory, IConsumersStats } from "../interfaces";

type getConsumersStatsOptions = {
  consumerFactory: IConsumerFactory
}

export default async function  getConsumersStats(options: getConsumersStatsOptions): Promise<IConsumersStats>{
  const consumerRepository = options.consumerFactory.createRepository()
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