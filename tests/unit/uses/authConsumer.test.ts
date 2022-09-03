import { ConsumerMemoryFactory } from "@/factories"
import userPool, { Consumer, IConsumerInputPayload, IConsumerSecrets } from "@/userPool"

describe("Use case aut consumer", ()=>{
  const consumerFactory = new ConsumerMemoryFactory()
  let consumerSecrets: IConsumerSecrets

  beforeAll(async ()=>{
    const consumerInputPayload: IConsumerInputPayload = {
      name: 'myApp',
      email: 'myapp@myapp.com',
      origin: ['*'],
      userMaxNumber: 0,
      groupMaxNumber: 0,
    }

    const consumer = new Consumer(consumerInputPayload)
    const consumerRepository = consumerFactory.createRepository()
    consumerSecrets = await consumerRepository.save(consumer)
  })

  it("Should authenticate a consumer", async ()=>{
    const consumerId = consumerSecrets.id
    const accessKey = consumerSecrets.accessKey.getValue()

    const token = await userPool.authConsumer({consumerId, accessKey}, {consumerFactory})
    expect(typeof token).toBe('string')
  })

  it("Should not authenticate a consumer", async ()=>{
    const consumerId = consumerSecrets.id
    const accessKey = ''

    await expect(async ()=>{
      await userPool.authConsumer({consumerId, accessKey}, {consumerFactory})
    }).rejects.toThrow()
  })
})