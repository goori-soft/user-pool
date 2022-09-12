import { Group, Event, WebError } from "../entities";
import { IConsumerRepository, IEventBus, IGroupRepository } from "../interfaces";
import { GroupInputPayload, GroupOutPutPayload, Events } from '../types'

type RegisterOptions = {
  groupRepository: IGroupRepository,
  consumerRepository: IConsumerRepository,
  eventBus?: IEventBus
}

export default async function registerGroup(groupInputPayload: GroupInputPayload, consumerId: string, options: RegisterOptions): Promise<GroupOutPutPayload> {
  const {
    groupRepository, 
    consumerRepository,
    eventBus,
  } = options
  const group = new Group(groupInputPayload, consumerId)

  try{
    if(!await consumerExists(consumerRepository, consumerId)) throw new WebError(`Consumer not found`, 404)
    const groupId = await groupRepository.insert(group)
    emit(eventBus, Events.GROUP_REGISTERED, {
      group: group.getData()
    })
    return { groupId }
  }
  catch(e: any){
    emit(eventBus, Events.GROUP_REGISTRATION_FAILED, {
      reason: e.toString(),
      group: group.getData()
    })
    throw e
  }
}

function emit(eventBus:IEventBus | undefined, eventName: string, message: any): void{
  if(eventBus){
    const event = new Event(eventName, message)
    eventBus.emit(event)
  }
}

async function consumerExists(consumerRepository:IConsumerRepository, consumerId: string): Promise<boolean>{
  const consumer = await consumerRepository.getById(consumerId)
  if(consumer) return true
  return false
}
