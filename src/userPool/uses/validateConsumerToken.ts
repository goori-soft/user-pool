import { Tokenizer } from "../entities/Tokenizer"
import { WebError } from "../entities/WebError"
import { IConsumerRepository } from "../interfaces"

type validateConsumerTokenOptions = {
  consumerRepository: IConsumerRepository
}

export default async function validateConsumerToken(token: string, options: validateConsumerTokenOptions){
  const consumerRepository = options.consumerRepository
  const tokenizer = new Tokenizer()
  const tokenPayload = tokenizer.decode(token)
  const consumer = await consumerRepository.getById(tokenPayload?.id as string)
  if(!consumer) throw new WebError(`Consumer not found`, 404)
  if(consumer.verify(token)){
    return {
      consumerId: tokenPayload?.id
    }
  }
  throw new WebError(`Consumer is not authenticated`, 401)
}