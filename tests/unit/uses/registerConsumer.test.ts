import userPool, { IConsumerInputPayload, IConsumerFactory } from "@/userPool"
import { ConsumerMemoryFactory } from '@/factories'

describe("Use case Register Consumer", ()=>{
  let consumerMemoryFactory: IConsumerFactory

  beforeAll(()=>{
    consumerMemoryFactory = new ConsumerMemoryFactory()
  })

  it("Should create a consumer in memory", async ()=>{
    
    const consumerInputPayload: IConsumerInputPayload = {
      name: 'My app',
      email: 'myapp@myapp.com',
      origin: ['*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const consumerAuthKeys = await userPool.registerConsumer(consumerInputPayload, consumerMemoryFactory)

    expect(consumerAuthKeys).toMatchObject({
      consumerId: expect.anything(),
      accessKey: expect.anything()
    })
  })
})