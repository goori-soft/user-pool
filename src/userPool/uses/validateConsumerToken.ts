import { Tokenizer } from "../entities/Tokenizer"
import { IConsumerFactory } from "../interfaces"

type validateConsumerTokenOptions = {
  consumerFactory: IConsumerFactory
}

export default async function validateConsumerToken(token: string, options: validateConsumerTokenOptions){
 const consumerRepository = options.consumerFactory.createRepository()
 const tokenizer = new Tokenizer()
 try{
  const tokenPayload = tokenizer.decode(token)
  const consumer = await consumerRepository.findById(tokenPayload?.id as string)
  return consumer.verify(token)
 }
 catch(e: any){
  return false
 }
}