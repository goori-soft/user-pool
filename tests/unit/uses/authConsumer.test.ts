import { MainMemoryFactory } from "@/factories"
import userPool, { Consumer } from "@/userPool"
import { ConsumerSecrets, ConsumerInputPayload } from '@/userPool/types'

describe("Use case aut consumer", ()=>{
  const mainFactory = new MainMemoryFactory()
  const consumerRepository = mainFactory.createConsumerRepository()
  const eventBus = new userPool.defaultImplementation.EventBus()
  let consumerSecrets: ConsumerSecrets

  beforeAll(async ()=>{
    const consumerInputPayload: ConsumerInputPayload = {
      name: 'myApp',
      email: 'myapp@myapp.com',
      origin: ['*'],
      userMaxNumber: 0,
      groupMaxNumber: 0,
    }

    const consumer = new Consumer(consumerInputPayload)
    consumerSecrets = await consumerRepository.insert(consumer)
  })

  it("Should authenticate a consumer", async ()=>{
    const consumerId = consumerSecrets.id
    const accessKey = consumerSecrets.accessKey.getValue()

    const token = await userPool.authConsumer({consumerId, accessKey}, { consumerRepository })
    expect(typeof token).toBe('string')
  })

  it("Should not authenticate a consumer", async ()=>{
    const consumerId = consumerSecrets.id
    const accessKey = ''

    await expect(async ()=>{
      await userPool.authConsumer({consumerId, accessKey}, { consumerRepository })
    }).rejects.toThrow()
  })

  it("Should emit an event", async ()=>{
    let eventReceived = undefined
    const expectedEventReceived ={
      name: 'CONSUMER_AUTHENTICATED',
      issuedOn: expect.any(String),
      identifier: expect.any(String),
      body: {
        consumer: {
          id: consumerSecrets.id,
          name: 'myApp',
          email: 'myapp@myapp.com',
          origin: ['*'],
          userMaxNumber: 0,
          groupMaxNumber: 0,
        }
      }
    }
    const handler = (event: any)=>{
      eventReceived = event
    }

    const consumerId = consumerSecrets.id
    const accessKey = consumerSecrets.accessKey.getValue()
    eventBus.on('CONSUMER_AUTHENTICATED', handler)
    await userPool.authConsumer({consumerId, accessKey}, { consumerRepository, eventBus })
    
    expect(eventReceived).toMatchObject(expectedEventReceived)
  })

  it("Should emit a error event", async ()=>{
    let eventReceived = undefined
    const expectedEventReceived ={
      name: 'CONSUMER_AUTHENTICATION_FAILED',
      issuedOn: expect.any(String),
      identifier: expect.any(String),
      body: {
        consumer: {
          id: consumerSecrets.id,
          name: 'myApp',
          email: 'myapp@myapp.com',
          origin: ['*'],
          userMaxNumber: 0,
          groupMaxNumber: 0,
        }
      }
    }
    const handler = (event: any)=>{
      eventReceived = event
    }
    const consumerId = consumerSecrets.id
    eventBus.on('CONSUMER_AUTHENTICATION_FAILED', handler)
    try{
      await userPool.authConsumer({consumerId, accessKey: '123'}, { consumerRepository, eventBus })
    }
    catch(e: any){
      //
    }
    expect(eventReceived).toMatchObject(expectedEventReceived)
  })
})