import { MetaData } from "./MetaData"

export type ProfileInputPayload = {
  name: string,
  description?: string,
  meta: MetaData[],
  policies: string[],
  groupId: string,
  userMaxNumber: number
}