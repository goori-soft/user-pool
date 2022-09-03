import { Group } from "../entities";
import { IGroupFactory, IGroupInputPayload, IGroupOutPutPayload } from "../interfaces";

type registerOptions = {
  groupFactory: IGroupFactory
}

export default async function registerGroup(groupInputPayload: IGroupInputPayload, consumerId: string, options: registerOptions): Promise<IGroupOutPutPayload> {
  const groupRepository = options.groupFactory.createRepository()
  const group = new Group(groupInputPayload, consumerId)
  const id = await groupRepository.save(group)
  return { id }
}
