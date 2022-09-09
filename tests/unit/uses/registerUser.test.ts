import { MainMemoryFactory } from "@/factories"
import userPool from "@/userPool"

describe("Use case register user", ()=>{
  const consumerId = '123'
  const mainFactory = new MainMemoryFactory()
  const userRepository = mainFactory.createUserRepository()

  it("Should register a new user", async ()=>{
    const userInputPayload = {
      name: 'John',
      email: 'john@john.com',
      password: 'john#123'
    }
    const options = {
      userRepository
    }
    const {userId} = await userPool.registerUser(userInputPayload, consumerId, options)
    expect(typeof userId).toBe('string')
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
    const options = {
      userRepository
    }

    const user1 = await userPool.registerUser(userInputPayload1, consumerId, options)
    expect( async ()=>{
      const user2 = await userPool.registerUser(userInputPayload1, consumerId, options)
    }).rejects.toThrow()
  })
})