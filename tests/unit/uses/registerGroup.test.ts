import { MainMemoryFactory } from '@/factories'
import userPool from '@/userPool'
import { GroupInputPayload, ConsumerAuthKeys } from '@/userPool/types'
import { consumerInputPayload } from '../../mocks/consumerInputPayload'

describe("use case Register Group", ()=>{
  let consumerAuthKeys: ConsumerAuthKeys
  const mainFactory = new MainMemoryFactory()
  const consumerRepository = mainFactory.createConsumerRepository()
  const groupRepository = mainFactory.createGroupRepository()
  const eventBus = new userPool.defaultImplementation.EventBus()

  beforeAll(async ()=>{  
    consumerAuthKeys = await userPool.registerConsumer(consumerInputPayload, { consumerRepository })
  })

  afterEach(async ()=>{
    await groupRepository.clean()
  })

  it("Should create a new group", async ()=>{
    const groupInputPayload: GroupInputPayload = {
      name: 'myGroup',
      description: 'Group for testing',
      userMaxNumber: 1
    }

    const groupOutPutPayload = await userPool.registerGroup(groupInputPayload, consumerAuthKeys.consumerId, { groupRepository, consumerRepository })
    expect(groupOutPutPayload).toMatchObject({groupId: expect.anything()})
  })

  it("Should not register a group with out a name", async ()=>{
    const groupInputPayload: GroupInputPayload = {
      name: '',
      description: 'Group for testing',
      userMaxNumber: 1
    }

    expect(async ()=>{
      await userPool.registerGroup(groupInputPayload, consumerAuthKeys.consumerId, { groupRepository, consumerRepository })
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

    const output1 = await userPool.registerGroup(groupPayload1, consumerAuthKeys.consumerId, { groupRepository, consumerRepository })
    const output2 = await userPool.registerGroup(groupPayload2, consumerAuthKeys.consumerId, { groupRepository, consumerRepository })

    expect(output1.groupId).not.toBe(output2.groupId)
  })

  it("Should emit an event", async ()=>{
    const groupPayload = {
      name: 'group 1',
      userMaxNumber: 0
    }

    let receivedEvent: any = undefined
    const expectedReceivedEvent = {
      name: 'GROUP_REGISTERED',
      issuedOn: expect.any(String),
      identifier: expect.any(String),
      body: {
        group: {
          name: 'group 1',
          description: expect.any(String),
          userMaxNumber: 0,
          meta: expect.any(Array),
          consumerId: consumerAuthKeys.consumerId
        }
      }
    }
    const handler = (eventData: any)=>{
      receivedEvent = eventData
    }

    eventBus.on('GROUP_REGISTERED', handler)
    await userPool.registerGroup(groupPayload, consumerAuthKeys.consumerId, { groupRepository, consumerRepository, eventBus })
    expect(receivedEvent).toMatchObject(expectedReceivedEvent)
  })

  it("Should not register a group in invalid consumer", async ()=>{
    const groupPayload = {
      name: 'group 1',
      userMaxNumber: 0
    }

    expect(async ()=>{
      await userPool.registerGroup(groupPayload, '123', { groupRepository, consumerRepository })
    }).rejects.toThrow()
  })

  it("Should emit a error event", async ()=>{
    const groupPayload = {
      name: 'group 1',
      userMaxNumber: 0
    }

    let receivedEvent: any = undefined
    const expectedReceivedEvent = {
      name: 'GROUP_REGISTRATION_FAILED',
      issuedOn: expect.any(String),
      identifier: expect.any(String),
      body: {
        reason: `Error 404: Consumer not found`,
        group: {
          name: 'group 1',
          description: expect.any(String),
          userMaxNumber: 0,
          meta: expect.any(Array),
          consumerId: '123'
        }
      }
    }
    const handler = (event: any)=>{
      receivedEvent = event
    }
    eventBus.on('GROUP_REGISTRATION_FAILED', handler)
    try{
      await userPool.registerGroup(groupPayload, '123', { groupRepository, consumerRepository, eventBus })
    }
    catch(e: any){
      //
    }

    expect(receivedEvent).toMatchObject(expectedReceivedEvent)
  })
})