import { MetaData } from "./MetaData"

export type UserData = {
  name: string,
  email: string,
  encodedPassword: string | null,
  meta: MetaData[],
  createdBy: string,
  salt: string
}