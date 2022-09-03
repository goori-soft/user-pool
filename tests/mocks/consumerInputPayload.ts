import { IConsumerInputPayload } from "@/userPool";

export const consumerInputPayload: IConsumerInputPayload = {
  name: 'myApp',
  email: 'myapp@myapp.com',
  origin: ['*'],
  userMaxNumber: 0,
  groupMaxNumber: 0
}

export const consumerInputPayloadLimited: IConsumerInputPayload = {
  name: 'myApp',
  email: 'myapp@myapp.com',
  origin: ['*'],
  userMaxNumber: 2,
  groupMaxNumber: 1
}
