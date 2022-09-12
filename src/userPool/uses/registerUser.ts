import { User } from "../entities"
import { WebError } from "../entities/WebError"
import { IConsumerRepository, IEventBus, IUserRepository } from "../interfaces"
import { UserInputPayload, UserOutPutPayload } from "../types"

type RegisterUserOptions = {
  userRepository: IUserRepository
  consumerRepository: IConsumerRepository,
  eventBus?: IEventBus
}

export default async function registerUser(payload: UserInputPayload, consumerId: string, options: RegisterUserOptions): Promise<UserOutPutPayload>{
  const {
    userRepository,
    consumerRepository,
    eventBus
  } = options

  if(await userExists(userRepository, payload.email)) throw new WebError(`User ${payload.email} is already registred`, 409)
  if(!await consumerExists(consumerRepository, consumerId)) throw new WebError(`Consumer does not exist`, 400)
  
  const user = new User(payload, consumerId)
  const userId = await userRepository.insert(user)
  return { userId }
}

async function userExists(userRepository: IUserRepository, email: string): Promise<boolean>{
  const user = await userRepository.getByEmail(email)
  if(user) return true
  return false
}

async function consumerExists(consumerRepository: IConsumerRepository, consumerId: string): Promise<boolean>{
  const consumer = await consumerRepository.getById(consumerId)
  if(consumer) return true
  return false
}