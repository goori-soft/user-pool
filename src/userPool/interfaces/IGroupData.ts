import { IMetaData } from "./IMetaData";

export interface IGroupData {
  name: string,
  description: string,
  userMaxNumber: number,
  meta: IMetaData[],
  consumerId: string
}