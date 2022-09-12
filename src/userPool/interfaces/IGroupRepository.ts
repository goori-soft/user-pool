import { Group } from "../entities/Group";

export interface IGroupRepository{
  insert(group: Group): Promise<string>
  getById(groupId: string, consumerId: string): Promise<Group | undefined>
  clean(): Promise<void>
}