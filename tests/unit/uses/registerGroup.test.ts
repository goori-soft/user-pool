import { MainMemoryFactory } from '@/factories'
import userPool from '@/userPool'
import { GroupInputPayload, ConsumerAuthKeys } from '@/userPool/types'
import { consumerInputPayload } from '../../mocks/consumerInputPayload'

describe("use case Register Group", ()=>{
  let consumerAuthKeys: ConsumerAuthKeys
  const mainFactory = new MainMemoryFactory()
  const consumerRepository = mainFactory.createConsumerRepository()
  const groupRepository = mainFactory.createGroupRepository()

  beforeAll(async ()=>{  
    consumerAuthKeys = await userPool.registerConsumer(consumerInputPayload, { consumerRepository })
  })

  it("Should create a new group", async ()=>{
    const groupInputPayload: GroupInputPayload = {
      name: 'myGroup',
      description: 'Group for testing',
      userMaxNumber: 1
    }

    const groupOutPutPayload = await userPool.registerGroup(groupInputPayload, consumerAuthKeys.consumerId, {groupRepository})
    expect(groupOutPutPayload).toMatchObject({groupId: expect.anything()})
  })

  it("Should not register a group with out a name", async ()=>{
    const groupInputPayload: GroupInputPayload = {
      name: '',
      description: 'Group for testing',
      userMaxNumber: 1
    }

    expect(async ()=>{
      await userPool.registerGroup(groupInputPayload, consumerAuthKeys.consumerId, { groupRepository })
    }).rejects.toThrow()
  })

  it("Should generate diferent id for tow diferent groups", async ()=>{
    const groupPayload1 = {
      name: 'group 1',
      userMaxNumber: 0
    }
    const groupPayload2 = {
      name: 'group 2',
      userMaxNumber: 0
    }

    const output1 = await userPool.registerGroup(groupPayload1, consumerAuthKeys.consumerId, { groupRepository })
    const output2 = await userPool.registerGroup(groupPayload2, consumerAuthKeys.consumerId, { groupRepository })

    expect(output1.groupId).not.toBe(output2.groupId)
  })
})