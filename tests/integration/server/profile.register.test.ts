import request from 'supertest'
import app from '@/server/app'
import { MainMemoryFactory } from "@/factories"
import userPool, { Consumer } from "@/userPool"
import { GroupInputPayload, PolicyInputPayload } from "@/userPool/types"
import { consumerInputPayload } from "../../mocks/consumerInputPayload"

describe("Profile register: POST /api/v1/profile/register", ()=>{
  let groupId: string
  let policyId1: string
  let policyId2: string

  const validHeaders: any = {}
  const invalidHeaders: any = {
    'x-consumer-access-token': ''
  }
  const registerProfileEndPoint = '/api/v1/profile/register'
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
  })

  it("Should register a new profile", async ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: 'Administrator',
      userMaxNumber: 1,
      meta: [
        {tag: 'adminGroup'}
      ],
      groupId,
      policies: ['edit', 'delete']
    }
    
    const response = await request(app)
      .post(registerProfileEndPoint)
      .set(validHeaders)
      .send(profileInputPayload)

    expect(response.statusCode).toBe(200)
    expect(typeof response.body?.profileId).toBe('string')
  })
})