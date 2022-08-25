import { IConsumerFactory, IConsumersStats } from "../entities/interfaces";

export default async function  getConsumersStats(consumerFactory: IConsumerFactory): Promise<IConsumersStats>{
  const consumerRepository = consumerFactory.createRepository()
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