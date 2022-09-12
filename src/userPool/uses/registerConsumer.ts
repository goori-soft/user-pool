import { WebError, Consumer, Event } from '../entities'
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

  const eventMessage: RegisterConsumerEventMessage = {
    consumer: {
      id: secrets.id,
      ...consumer.getData()
    }
  }
  emit(eventBus, Events.CONSUMER_CREATED, eventMessage)
  
  return {
    consumerId: secrets.id,
    accessKey: secrets.accessKey.getValue()
  }
}

async function consumerExists(email: string, consumerRepository: IConsumerRepository): Promise<boolean>{
  const consumers = await consumerRepository.getByEmail(email)
  return consumers.length > 0
}

function emit(eventBus: IEventBus | undefined, eventName: string, message: any){
  if(eventBus){
    const event = new Event(eventName, message)
    eventBus.emit(event)
  }
}