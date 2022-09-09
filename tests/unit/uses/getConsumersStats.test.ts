import userPool, { Consumer } from "@/userPool"
import { ConsumerInputPayload } from '@/userPool/types'
import { MainMemoryFactory } from '@/factories'

describe("Use case get consumers stas", ()=>{
  const mainFactory = new MainMemoryFactory()
  const consumerRepository = mainFactory.createConsumerRepository()
  
  it("Should get a empty list of consumers", async ()=>{
    const consumersStats = await userPool.getConsumersStats({consumerRepository})
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
    const consumerInputPayload: ConsumerInputPayload = {
      name: 'myApp',
      email: 'myapp@myapp.com',
      origin: ['*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }
    const consumer = new Consumer(consumerInputPayload)
    await consumerRepository.insert(consumer)

    const consumersStats = await userPool.getConsumersStats({consumerRepository})
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