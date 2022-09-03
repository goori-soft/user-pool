import { ConsumerMemoryFactory } from "@/factories"
import userPool, { IConsumerInputPayload } from "@/userPool"

describe("Use case validate consumer token", ()=>{
  const tokens = {
    validToken: '',
    invalidToken: ''
  }
  const consumerFactory = new ConsumerMemoryFactory()

  beforeAll(async ()=>{
    
    const consumerInputPayload: IConsumerInputPayload = {
      name: "myApp",
      email: "myapp@myapp.com",
      origin: ['*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }
    const consumerSecrets = await userPool.registerConsumer(consumerInputPayload, {consumerFactory})
    
    
    tokens.validToken = await userPool.authConsumer(consumerSecrets, {consumerFactory})
  })

  it("Should validade a valid consumer token", async ()=>{
    const validate = await userPool.validateConsumerToken(tokens.validToken, {consumerFactory})
    expect(validate).toBe(true)
  })

  it("Should not validate a invalid consumer token", async ()=>{
    const validate = await userPool.validateConsumerToken(tokens.invalidToken, {consumerFactory})
    expect(validate).toBe(false)
  })
})