import { MetaData } from "./MetaData"

export type UserInputPayload = {
  name: string,
  email: string,
  password?: string,
  meta?: MetaData[]
}