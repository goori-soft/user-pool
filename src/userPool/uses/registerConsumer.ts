import { consumerInputPayload } from '@tests/mocks/consumerInputPayload'
import { Consumer } from '../entities/Consumer'
import { WebError } from '../entities/WebError'
import { IConsumerRepository } from '../interfaces'
import { IEventBus } from '../interfaces/IEventBus'
import { ConsumerInputPayload, ConsumerAuthKeys, Events } from '../types'

type RegisterConsumerOptions = {
  consumerRepository: IConsumerRepository,
  eventBus?: IEventBus
}

type RegisterConsumerEventMessage = {
  consumer: {
    id: string,
    name: string,
    email: string,
    origin: string[],
    userMaxNumber: number,
    groupMaxNumber: number
  }
}

export default async function registerConsumer(payload: ConsumerInputPayload, options: RegisterConsumerOptions): Promise<ConsumerAuthKeys>{
  const {consumerRepository, eventBus} = options
  if(await consumerExists(payload.email, consumerRepository)) throw new WebError(`This email is already registered`, 406)
  
  const consumer = new Consumer(payload)
  const secrets = await consumerRepository.insert(consumer)
  consumer.setSecrets(secrets)

  if(eventBus){
    const eventMessage: RegisterConsumerEventMessage = {
      consumer: {
        id: secrets.id,
        ...consumer.getData()
      }
    }
    eventBus.emit(Events.CONSUMER_CREATED, eventMessage)
  }

  return {
    consumerId: secrets.id,
    accessKey: secrets.accessKey.getValue()
  }
}

async function consumerExists(email: string, consumerRepository: IConsumerRepository): Promise<boolean>{
  const consumers = await consumerRepository.findByEmail(email)
  return consumers.length > 0
}
