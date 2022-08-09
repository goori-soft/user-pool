import { ConsumerRepository } from '@/adapters/consumerRepository'
import { createConsumer as fac } from '@/entities/consumer/factories/createConsumer'

export async function createConsumer(payload: any){
  const consumer = fac(payload)
  const consumerRepository = new ConsumerRepository()
  const consumerObject = consumer.parseToObject()
  await consumerRepository.save(consumerObject)
  const consumerId = consumerRepository.getId()
  

  consumer.setId(consumerId)

  return {accessKey: consumer.getAccessKey(), consumerId}
}