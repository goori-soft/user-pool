import { ConsumerMemoryFactory } from '@/factories'
import { GroupMemoryFactory } from '@/factories/GroupMemoryFactory'
import userPool, { IConsumerAuthKeys } from '@/userPool'
import { IGroupInputPayload } from '@/userPool/interfaces/IGroupInputPayload'
import { consumerInputPayload } from '../../mocks/consumerInputPayload'

describe("use case Register Group", ()=>{
  let consumerAuthKeys: IConsumerAuthKeys
  const groupFactory = new GroupMemoryFactory()
  const consumerFactory = new ConsumerMemoryFactory()

  beforeAll(async ()=>{  
    consumerAuthKeys = await userPool.registerConsumer(consumerInputPayload, {consumerFactory})
  })

  it("Should create a new group", async ()=>{
    const groupInputPayload: IGroupInputPayload = {
      name: 'myGroup',
      description: 'Group for testing',
      userMaxNumber: 1
    }

    const groupOutPutPayload = await userPool.registerGroup(groupInputPayload, consumerAuthKeys.consumerId, {groupFactory})
    expect(groupOutPutPayload).toMatchObject({id: expect.anything()})
  })

  it("Should not register a group with out a name", async ()=>{
    const groupInputPayload: IGroupInputPayload = {
      name: '',
      description: 'Group for testing',
      userMaxNumber: 1
    }

    expect(async ()=>{
      await userPool.registerGroup(groupInputPayload, consumerAuthKeys.consumerId, {groupFactory})
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

    const output1 = await userPool.registerGroup(groupPayload1, consumerAuthKeys.consumerId, {groupFactory})
    const output2 = await userPool.registerGroup(groupPayload2, consumerAuthKeys.consumerId, {groupFactory})

    expect(output1.id).not.toBe(output2.id)
  })
})