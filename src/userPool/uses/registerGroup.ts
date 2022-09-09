import { Group } from "../entities";
import { IGroupRepository } from "../interfaces";
import { GroupInputPayload, GroupOutPutPayload } from '../types'

type RegisterOptions = {
  groupRepository: IGroupRepository
}

export default async function registerGroup(groupInputPayload: GroupInputPayload, consumerId: string, options: RegisterOptions): Promise<GroupOutPutPayload> {
  const groupRepository = options.groupRepository
  const group = new Group(groupInputPayload, consumerId)
  const groupId = await groupRepository.insert(group)
  return { groupId }
}
