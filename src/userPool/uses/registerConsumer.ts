import { AccessKey } from '../entities/AccessKey'
import { Consumer } from '../entities/Consumer'
import { 
  IConsumerFactory, 
  IConsumerInputPayload, 
  IConsumerData,
  IConsumerAuthKeys
} from '../entities/interfaces'

export default async function registerConsumer(payload: IConsumerInputPayload, consumerFactory: IConsumerFactory): Promise<IConsumerAuthKeys>{
  const consumer = new Consumer(payload)
  const consumerRepository = consumerFactory.createRepository()

  const secrets = await consumerRepository.save(consumer)
  consumer.setSecrets(secrets)

  return {
    consumerId: secrets.id,
    accessKey: secrets.accessKey.getValue()
  }
}