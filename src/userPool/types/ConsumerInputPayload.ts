export type ConsumerInputPayload = {
  name: string,
  email: string,
  origin: string[],
  userMaxNumber: number,
  groupMaxNumber: number,
  id?: string,
  accessKey?: string
}