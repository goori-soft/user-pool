import { Policy, Event, WebError } from "../entities"
import { IConsumerRepository, IEventBus, IPolicyRepository } from "../interfaces"
import { PolicyOutPutPayload, PolicyInputPayload, Events } from '../types'

type RegisterPolicyOptions = {
  policyRepository: IPolicyRepository,
  consumerRepository: IConsumerRepository,
  eventBus?: IEventBus
}

export default async function registerPolicy(policyInputPayload: PolicyInputPayload, consumerId: string, options: RegisterPolicyOptions): Promise<PolicyOutPutPayload> {
  const {
    policyRepository, 
    consumerRepository, 
    eventBus
  } = options

  try{
    if(!await consumerExists(consumerRepository, consumerId)){
      throw new WebError(`Consumer not found`, 404)
    }
    const policy = new Policy(policyInputPayload, consumerId)
    const policyId = await policyRepository.insert(policy)
    const policyEventMessage = {
      policy: { policyId, ...policy.getData()}
    }
    emit(eventBus, Events.POLICY_REGISTERED, policyEventMessage)
    return {policyId}
  }
  catch(e: any){
    emit(eventBus, Events.POLICY_REGISTRATION_FAILED, {
      reason: e.toString(),
      policy: {...policyInputPayload}
    })
    throw e
  }
}

function emit(eventBus: IEventBus | undefined, eventName: string, message: any): void{
  if(eventBus){
    const event = new Event(eventName, message)
    eventBus.emit(event)
  }
}

async function consumerExists(consumerRepository: IConsumerRepository, consumerId: string){
  const consumer = await consumerRepository.getById(consumerId)
  if(consumer) return true
  return false
}