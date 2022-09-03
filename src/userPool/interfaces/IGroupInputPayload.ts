import { IMetaData } from "./IMetaData";

export interface IGroupInputPayload {
  name: string,
  description?: string,
  userMaxNumber: number,
  meta?: IMetaData[]
}