import request from 'supertest'
import app from '@/server/app'
import { ConsumerMemoryFactory } from '@/factories'
import userPool from '@/userPool'
describe("Consumer auth: POST consumer/auth", ()=>{
  const authCostumerEndPoint = '/api/v1/consumer/auth'
  const validHeaders = {}
  const validPayload = {
    consumerId: '',
    accessKey: ''
  }
  
  const consumerPayload = {
    name: 'My App',
    email: 'myapp@myapp.com',
    origin: ['*'],
    userMaxNumber: 2,
    groupMaxNumber: 2,
  }

  beforeAll(async ()=>{
    const consumerMemoryFactory = new ConsumerMemoryFactory()
    const consumerAuthKeys = await userPool.registerConsumer(consumerPayload, consumerMemoryFactory)
    validPayload.consumerId = consumerAuthKeys.consumerId
    validPayload.accessKey = consumerAuthKeys.accessKey
  })
  it("Should auth the consumer", async ()=>{
    const response = await request(app)
      .post(authCostumerEndPoint)
      .set(validHeaders)
      .send(validPayload)

    expect(response.statusCode).toBe(200)
    expect(typeof response.body?.token).toBe('string')
  })
})