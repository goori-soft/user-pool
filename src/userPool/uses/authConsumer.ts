import { IConsumerAuthKeys, IConsumerFactory } from "../interfaces";
import { WebError } from "../entities/WebError";

type authConsumerOptions = {
  consumerFactory: IConsumerFactory
}

export default async function authConsumer(consumerAuthKeys: IConsumerAuthKeys, options: authConsumerOptions): Promise<string>{
  const consumerRepository = options.consumerFactory.createRepository()
  try{
    const consumer = await consumerRepository.findById(consumerAuthKeys.consumerId)
    const token = consumer.auth(consumerAuthKeys.accessKey)
    return token
  }
  catch(e: any){
    throw new WebError(`Wrong consumerId or accessKey`, 401)
  }
}