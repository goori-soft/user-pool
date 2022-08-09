import { Consumer } from "@/entities/consumer";
import { IConsumerPayload } from "@/entities/interfaces/IConsumerPayload";
import { ConsumerRepository } from "@/adapters/consumerRepository";

export function fabricateConsumer(payload: IConsumerPayload){
  const consumerRepository = new ConsumerRepository()

  return new Consumer(
    payload,
    consumerRepository
  )
}