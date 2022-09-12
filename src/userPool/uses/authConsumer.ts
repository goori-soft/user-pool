import { IConsumerRepository, IEventBus } from "../interfaces"
import { ConsumerAuthKeys, Events } from '../types'
import { WebError, Event } from "../entities"

type authConsumerOptions = {
  consumerRepository: IConsumerRepository,
  eventBus?: IEventBus
}

export default async function authConsumer(consumerAuthKeys: ConsumerAuthKeys, options: authConsumerOptions): Promise<string>{
  const {consumerRepository, eventBus} = options
  const eventBody = {
    consumer: {
      id: consumerAuthKeys.consumerId
    }
  }
  try{
    const consumer = await consumerRepository.getById(consumerAuthKeys.consumerId)
    if(!consumer) throw new WebError(`Consumer not found`, 404)
    eventBody.consumer = Object.assign(eventBody.consumer, consumer.getData())
    const token = consumer.auth(consumerAuthKeys.accessKey)
    emit(eventBus, Events.CONSUMER_AUTHENTICATED, eventBody)
    return token
  }
  catch(e: any){
    emit(eventBus, Events.CONSUMER_AUTHENTICATION_FAILED, eventBody)
    throw new WebError(`Wrong consumerId or accessKey`, 401)
  }
}

function emit(eventBus: IEventBus | undefined, eventName: string, body: any){
  if(eventBus){
    const event = new Event(eventName, body)
    eventBus.emit(event)
  }
}