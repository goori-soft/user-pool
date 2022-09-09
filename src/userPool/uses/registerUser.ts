import { User } from "../entities"
import { WebError } from "../entities/WebError"
import { IUserRepository } from "../interfaces"
import { UserInputPayload, UserOutPutPayload } from "../types"

type RegisterUserOptions = {
  userRepository: IUserRepository
}

export default async function registerUser(payload: UserInputPayload, consumerId: string, options: RegisterUserOptions): Promise<UserOutPutPayload>{
  const {userRepository} = options
  const userExists = await userRepository.getByEmail(payload.email)
  if(userExists) throw new WebError(`User ${payload.email} is already registred`, 409)
  const user = new User(payload, consumerId)
  const userId = await userRepository.insert(user)
  return { userId }
}