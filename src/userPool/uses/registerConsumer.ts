import { Consumer } from '../entities/Consumer'
import { 
  IConsumerFactory, 
  IConsumerInputPayload, 
  IConsumerAuthKeys
} from '../interfaces'

type registerConsumerOptions = {
  consumerFactory: IConsumerFactory
}

export default async function registerConsumer(payload: IConsumerInputPayload, options: registerConsumerOptions): Promise<IConsumerAuthKeys>{
  const consumer = new Consumer(payload)
  const consumerRepository = options.consumerFactory.createRepository()

  const secrets = await consumerRepository.save(consumer)
  consumer.setSecrets(secrets)

  return {
    consumerId: secrets.id,
    accessKey: secrets.accessKey.getValue()
  }
}