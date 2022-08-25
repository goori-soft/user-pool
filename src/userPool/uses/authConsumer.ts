import { IConsumerAuthKeys, IConsumerFactory } from "../entities/interfaces";
import { WebError } from "../entities/WebError";

export default async function authConsumer(consumerAuthKeys: IConsumerAuthKeys, consumerFactory: IConsumerFactory): Promise<string>{
  const consumerRepository = consumerFactory.createRepository()
  try{
    const consumer = await consumerRepository.findById(consumerAuthKeys.consumerId)
    const token = consumer.auth(consumerAuthKeys.accessKey)
    return token
  }
  catch(e: any){
    throw new WebError(`Wrong consumerId or accessKey`, 401)
  }
}