import { MetaData } from "./MetaData";

export type GroupInputPayload = {
  name: string,
  description?: string,
  userMaxNumber: number,
  meta?: MetaData[]
}