import userPool from "@/userPool"
import { ConsumerInputPayload, Events } from '@/userPool/types'
import { MainMemoryFactory } from '@/factories'

describe("Use case Register Consumer", ()=>{
  const mainFactory = new MainMemoryFactory()
  const consumerRepository = mainFactory.createConsumerRepository()

  it("Should create a consumer in memory", async ()=>{
    
    const consumerInputPayload: ConsumerInputPayload = {
      name: 'My app',
      email: 'myapp@myapp.com',
      origin: ['*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const consumerAuthKeys = await userPool.registerConsumer(consumerInputPayload, {consumerRepository})

    expect(consumerAuthKeys).toMatchObject({
      consumerId: expect.anything(),
      accessKey: expect.anything()
    })
  })

  it("Should emit event CONSUMER_CREATED", async ()=>{
    const consumerInputPayload: ConsumerInputPayload = {
      name: 'My app1',
      email: 'myapp1@myapp.com',
      origin: ['*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }
    let eventBody: any = {}
    let eventName: any
    let eventIdentifier: any
    const eventBus = new userPool.defaultImplementation.EventBus()
    const expectedEventBody = {
      id: expect.any(String),
      name: consumerInputPayload.name,
      email: consumerInputPayload.email,
      origin: [...consumerInputPayload.origin],
      userMaxNumber: 0,
      groupMaxNumber: 0,
    }
    
    eventBus.on(Events.CONSUMER_CREATED, (event)=>{
      eventBody = event.body
      eventName = event.name
      eventIdentifier = event.identifier
    })

    const consumerAuthKeys = await userPool.registerConsumer(consumerInputPayload, {consumerRepository, eventBus})

    expect(eventName).toEqual('CONSUMER_CREATED')
    expect(typeof eventIdentifier).toBe('string')
    expect(eventBody.consumer).toMatchObject(expectedEventBody)
  })
})