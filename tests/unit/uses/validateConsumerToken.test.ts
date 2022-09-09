import { MainMemoryFactory } from "@/factories"
import userPool from "@/userPool"
import { ConsumerInputPayload } from '@/userPool/types'

describe("Use case validate consumer token", ()=>{
  const tokens = {
    validToken: '',
    invalidToken: ''
  }
  const mainFactory = new MainMemoryFactory()
  const consumerRepository = mainFactory.createConsumerRepository()

  beforeAll(async ()=>{
    
    const consumerInputPayload: ConsumerInputPayload = {
      name: "myApp",
      email: "myapp@myapp.com",
      origin: ['*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }
    const consumerSecrets = await userPool.registerConsumer(consumerInputPayload, { consumerRepository })
    
    tokens.validToken = await userPool.authConsumer(consumerSecrets, { consumerRepository })
  })

  it("Should validade a valid consumer token", async ()=>{
    const validate = await userPool.validateConsumerToken(tokens.validToken, { consumerRepository })
    expect(validate).toMatchObject({consumerId: expect.any(String)})
  })

  it("Should not validate a invalid consumer token", async ()=>{
    expect(async ()=>{
      await userPool.validateConsumerToken(tokens.invalidToken, { consumerRepository })
    }).rejects.toThrow()
  })
})