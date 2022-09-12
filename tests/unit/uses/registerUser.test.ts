import { MainMemoryFactory } from "@/factories"
import userPool from "@/userPool"
import { ConsumerAuthKeys } from "@/userPool/types"
import { consumerInputPayload } from "../../mocks/consumerInputPayload"

describe("Use case register user", ()=>{
  let consumerAuthKeys: ConsumerAuthKeys
  const invalidConsumerId = '123'
  const mainFactory = new MainMemoryFactory()
  const userRepository = mainFactory.createUserRepository()
  const consumerRepository = mainFactory.createConsumerRepository()

  const options = {
    userRepository,
    consumerRepository
  }

  beforeAll( async ()=>{
    consumerAuthKeys = await userPool.registerConsumer(consumerInputPayload, { consumerRepository })
  })

  afterEach( async ()=>{
    await userRepository.clean()
  })

  it("Should register a new user", async ()=>{
    const userInputPayload = {
      name: 'John',
      email: 'john@john.com',
      password: 'john#123'
    }

    const {userId} = await userPool.registerUser(userInputPayload, consumerAuthKeys.consumerId, options)
    expect(typeof userId).toBe('string')
  })

  it("Should not register a new user in invalid consumer", async ()=>{
    const userInputPayload = {
      name: 'Ariel',
      email: 'ariel@john.com',
      password: 'john#123'
    }
    
    expect(async ()=>{
      await userPool.registerUser(userInputPayload, invalidConsumerId, options)
    }).rejects.toThrow()
    
  })

  it("Shoul not register two users with the same email", async ()=>{
    const userInputPayload1 = {
      name: 'Tonny',
      email: 'tonny@john.com',
      password: 'tonny#123'
    }
    const userInputPayload2 = {
      name: 'Brian',
      email: 'tonny@john.com',
      password: 'brian#123'
    }

    await userPool.registerUser(userInputPayload1, consumerAuthKeys.consumerId, options)
    expect( async ()=>{
      await userPool.registerUser(userInputPayload2, consumerAuthKeys.consumerId, options)
    }).rejects.toThrow()
  })
})