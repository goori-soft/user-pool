import userPool, { Consumer, IConsumerFactory, IConsumerInputPayload } from "@/userPool"
import { ConsumerMemoryFactory } from '@/factories'

describe("Use case get consumers stas", ()=>{
  let consumerFactory: IConsumerFactory

  beforeAll(()=>{
    consumerFactory = new ConsumerMemoryFactory()
  })
  it("Should get a empty list of consumers", async ()=>{
    const consumersStats = await userPool.getConsumersStats({consumerFactory})
    const expectedResponseStructure = {
      total: expect.any(Number),
      active: expect.any(Number),
      inactive: expect.any(Number),
      consumers: expect.anything()
    }

    expect(consumersStats).toMatchObject(expectedResponseStructure)
    expect(Array.isArray(consumersStats.consumers)).toBe(true)
    expect(consumersStats.consumers.length).toBe(0)
  })

  it("Should return one consumer in consumers stats", async ()=>{
    const consumerInputPayload: IConsumerInputPayload = {
      name: 'myApp',
      email: 'myapp@myapp.com',
      origin: ['*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }
    const consumer = new Consumer(consumerInputPayload)
    const consumerRepository = consumerFactory.createRepository()
    await consumerRepository.save(consumer)

    const consumersStats = await userPool.getConsumersStats({consumerFactory})
    expect(consumersStats.total).toBe(1)
    expect(consumersStats.active).toBe(1)
    expect(consumersStats.inactive).toBe(0)
    expect(consumersStats.consumers.length).toBe(1)
    expect(consumersStats.consumers[0].name).toBe(consumerInputPayload.name)
    expect(consumersStats.consumers[0].email).toBe(consumerInputPayload.email)
    expect(consumersStats.consumers[0].origin.join()).toBe(consumerInputPayload.origin.join())
    expect(consumersStats.consumers[0].userMaxNumber).toBe(consumerInputPayload.userMaxNumber)
    expect(consumersStats.consumers[0].groupMaxNumber).toBe(consumerInputPayload.groupMaxNumber)
  })
})