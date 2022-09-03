import { Group } from "../entities/Group";

export interface IGroupRepository{
  save(group: Group): Promise<string>
}