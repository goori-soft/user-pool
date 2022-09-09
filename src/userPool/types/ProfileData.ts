import { MetaData } from "./MetaData"

export type ProfileData = {
  name: string,
  description: string,
  userMaxNumber: number,
  groupId: string,
  policies: string[],
  meta: MetaData[],
  consumerId: string
}