import request from 'supertest'
import app from '@/server/app'
import {consumerInputPayload} from '../../mocks/consumerInputPayload'
import { ConsumerMongoFactory } from '@/factories'
import { Consumer } from '@/userPool'
import userPool from '@/userPool'
describe("Group register: POST api/v1/group/register", ()=>{
  const validHeaders: any = {}
  const invalidHeaders: any = {
    'x-consumer-access-token': ''
  }
  const registerGroupEndPoint = '/api/v1/group/register'

  beforeAll( async ()=>{
    const consumerFactory = new ConsumerMongoFactory()
    const consumerRepository = consumerFactory.createRepository()
    const consumer = new Consumer(consumerInputPayload)
    const consumerSecrets = await consumerRepository.save(consumer)

    const xConsumerAccessToken = await userPool.authConsumer({
      consumerId: consumerSecrets.id,
      accessKey: consumerSecrets.accessKey.getValue()
    }, { consumerFactory })

    validHeaders['x-consumer-access-token'] = xConsumerAccessToken
  })

  it("Should create a new group", async ()=>{
    const groupInputPayload = {
      name: 'myGroup',
      description: 'This is just a group for testing',
      userMaxNumber: '1',
      meta: [
        {key: 'type', value: 'soccer'}
      ]
    }

    const response = await request(app)
      .post(registerGroupEndPoint)
      .set(validHeaders)
      .send(groupInputPayload)

    expect(response.statusCode).toBe(200)
    expect(typeof response.body?.groupId).toBe('string')
  })

  it("Should not create a new group for a invalid consumer", async ()=>{
    const groupInputPayload = {
      name: 'myGroup',
      description: 'This is just a group for testing',
      userMaxNumber: '1',
      meta: [
        {key: 'type', value: 'soccer'}
      ]
    }

    const response = await request(app)
      .post(registerGroupEndPoint)
      .set(invalidHeaders)
      .send(groupInputPayload)

    expect(response.statusCode).toBe(401)
    expect(typeof response.body?.groupId).toBe("undefined")
  })

})