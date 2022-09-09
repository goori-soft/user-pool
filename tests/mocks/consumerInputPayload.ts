import { ConsumerInputPayload } from "@/userPool/types";

export const consumerInputPayload: ConsumerInputPayload = {
  name: 'myApp',
  email: 'myapp@myapp.com',
  origin: ['*'],
  userMaxNumber: 0,
  groupMaxNumber: 0
}

export const consumerInputPayload2: ConsumerInputPayload = {
  name: 'myApp2',
  email: 'myapp2@myapp.com',
  origin: ['*'],
  userMaxNumber: 0,
  groupMaxNumber: 0
}

export const consumerInputPayloadLimited: ConsumerInputPayload = {
  name: 'myApp',
  email: 'myapp@myapp.com',
  origin: ['*'],
  userMaxNumber: 2,
  groupMaxNumber: 1
}
