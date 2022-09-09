import request from 'supertest'
import app from '@/server/app'
import { MainMemoryFactory } from "@/factories"
import userPool, { Consumer } from "@/userPool"
import { GroupInputPayload, PolicyInputPayload } from "@/userPool/types"
import { consumerInputPayload } from "../../mocks/consumerInputPayload"

describe("User register: POST /api/v1/user/register", ()=>{

  let groupId: string
  let policyId1: string
  let policyId2: string

  const validHeaders: any = {}
  const invalidHeaders: any = {
    'x-consumer-access-token': ''
  }
  const registerUserEndPoint = '/api/v1/user/register'
  const mainFactory = new MainMemoryFactory()

  beforeAll( async ()=>{
    // create a consumer
    
    const consumerRepository = mainFactory.createConsumerRepository()
    const consumer = new Consumer(consumerInputPayload)
    const consumerSecrets = await consumerRepository.insert(consumer)

    const xConsumerAccessToken = await userPool.authConsumer({
      consumerId: consumerSecrets.id,
      accessKey: consumerSecrets.accessKey.getValue()
    }, { consumerRepository })

    validHeaders['x-consumer-access-token'] = xConsumerAccessToken

    // create a new group
    const groupRepository = mainFactory.createGroupRepository()
    const groupInputPayload: GroupInputPayload = {
      name: "myGroup",
      userMaxNumber: 0
    }
    const group = await userPool.registerGroup(groupInputPayload, consumerSecrets.id, { groupRepository })
    groupId = group.groupId


    // create 2 policies
    const policyRepository = mainFactory.createPolicyRepository()
    const policyInputPayload1: PolicyInputPayload = {
      identifier: "edit",
      name: "Edit"
    }
    const policyInputPayload2: PolicyInputPayload = {
      identifier: "delete",
      name: "Delete"
    }
    const policy1 = await userPool.registerPolicy(policyInputPayload1, consumerSecrets.id, { policyRepository })
    const policy2 = await userPool.registerPolicy(policyInputPayload2, consumerSecrets.id, { policyRepository })
    policyId1 = policy1.policyId
    policyId2 = policy2.policyId

    // register a new profile

  })

  it("Should register a new user", async ()=>{
    const userInputPayload = {
      name: 'John',
      email: 'john@john.com',
      password: 'Jhon#99'
    }

    const response = await request(app)
      .post(registerUserEndPoint)
      .set(validHeaders)
      .send(userInputPayload)

    expect(response.statusCode).toBe(200)
    expect(typeof response.body?.userId).toBe('string')
  })

  it("Should not register a user with invalid header", async ()=>{
    const userInputPayload = {
      name: 'John1',
      email: 'john1@john.com',
      password: 'Jhon#99'
    }

    const response = await request(app)
      .post(registerUserEndPoint)
      .set(invalidHeaders)
      .send(userInputPayload)

    expect(response.statusCode).toBe(401)
    expect(typeof response.body?.userId).toBe('undefined')
  })

  it("Should not register a user with invalid header", async ()=>{
    const userInputPayload = {
      name: 'John1',
      email: 'john1@john.com',
      password: 'Jhon#99'
    }

    const response = await request(app)
      .post(registerUserEndPoint)
      .set(invalidHeaders)
      .send(userInputPayload)

    expect(response.statusCode).toBe(401)
    expect(typeof response.body?.userId).toBe('undefined')
  })

  it("Should not register tow users with same email", async ()=>{
    const userInputPayload1 = {
      name: 'Jnny',
      email: 'jonny@john.com',
      password: 'Jhon#99'
    }
    const userInputPayload2 = {
      name: 'Brian',
      email: 'jonny@john.com',
      password: 'Brian#01'
    }

    const response1 = await request(app)
      .post(registerUserEndPoint)
      .set(validHeaders)
      .send(userInputPayload1)

    const response2 = await request(app)
      .post(registerUserEndPoint)
      .set(validHeaders)
      .send(userInputPayload2)


    expect(response1.statusCode).toBe(200)
    expect(typeof response1.body?.userId).toBe('string')

    expect(response2.statusCode).toBe(409)
    expect(typeof response2.body?.userId).toBe('undefined')
    expect(typeof response2.body?.message).toBe('string')
  })

})