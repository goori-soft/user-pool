import request from 'supertest'
import app from '@/server/app'
import { MainMemoryFactory } from '@/factories'
import userPool, { Consumer } from '@/userPool'
import { consumerInputPayload } from '../../mocks/consumerInputPayload'

describe("Policy register: POST /api/v1/policy/register", ()=>{
  const validHeaders: any = {}
  const invalidHeaders: any = {
    'x-consumer-access-token': ''
  }
  const registerPolicyEndPoint = '/api/v1/policy/register'

  beforeAll( async ()=>{
    const mainFactory = new MainMemoryFactory()
    const consumerRepository = mainFactory.createConsumerRepository()
    const consumer = new Consumer(consumerInputPayload)
    const consumerSecrets = await consumerRepository.insert(consumer)

    const xConsumerAccessToken = await userPool.authConsumer({
      consumerId: consumerSecrets.id,
      accessKey: consumerSecrets.accessKey.getValue()
    }, { consumerRepository })

    validHeaders['x-consumer-access-token'] = xConsumerAccessToken
  })

  it("Should register a new policy", async ()=>{
    const policyInputPayload = {
      identifier: 'edit',
      name: 'Edit',
      description: 'Enable user to edit something here',
    }

    const response = await request(app)
      .post(registerPolicyEndPoint)
      .set(validHeaders)
      .send(policyInputPayload)

    expect(response.statusCode).toBe(200)
    expect(typeof response.body?.policyId).toBe('string')
  })

  it("Should not register a new policy without consumer header", async ()=>{
    const policyInputPayload = {
      identifier: 'edit',
      name: 'Edit',
      description: 'Enable user to edit something here',
    }

    const response = await request(app)
      .post(registerPolicyEndPoint)
      .set(invalidHeaders)
      .send(policyInputPayload)

    expect(response.statusCode).toBe(401)
    expect(typeof response.body?.policyId).toBe('undefined')
  })
})