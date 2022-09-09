import { MetaData } from "./MetaData";

export type GroupData = {
  name: string,
  description: string,
  userMaxNumber: number,
  meta: MetaData[],
  consumerId: string
}