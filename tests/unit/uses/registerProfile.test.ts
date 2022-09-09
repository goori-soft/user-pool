import { MainMemoryFactory } from "@/factories"
import userPool from "@/userPool"
import { GroupInputPayload } from "@/userPool/types"
import { consumerInputPayload, consumerInputPayload2 } from "../../mocks/consumerInputPayload"

describe("Use case register profile", ()=>{
  let groupId: string
  let groupId2: string
  let consumerId: string
  let consumerId2: string
  const mainFactory = new MainMemoryFactory()
  const consumerRepository = mainFactory.createConsumerRepository()
  const policyRepository = mainFactory.createPolicyRepository()
  const groupRepository = mainFactory.createGroupRepository()
  const profileRepository = mainFactory.createProfileRepository()
  
  beforeAll( async ()=>{
    const consumerAuthKeys = await userPool.registerConsumer(consumerInputPayload, { consumerRepository })
    consumerId = consumerAuthKeys.consumerId
    const groupInputPayload: GroupInputPayload = {
      name: "myGroup",
      userMaxNumber: 0
    }
    const group = await userPool.registerGroup(groupInputPayload, consumerAuthKeys.consumerId, { groupRepository } )
    groupId = group.groupId

    const policyInputPayload1 = {
      identifier: 'edit',
      name: 'Edit',
      description: 'Enable user to edit something here'
    }
    const policyInputPayload2 = {
      identifier: 'delete',
      name: 'Delete',
      description: 'Enable user to delete something here'
    }

    await userPool.registerPolicy(policyInputPayload1, consumerAuthKeys.consumerId, { policyRepository })
    await userPool.registerPolicy(policyInputPayload2, consumerAuthKeys.consumerId, { policyRepository })

    const consumerAuthKeys2 = await userPool.registerConsumer(consumerInputPayload2, { consumerRepository })
    consumerId2 = consumerAuthKeys2.consumerId
    const group2 = await userPool.registerGroup(groupInputPayload, consumerAuthKeys2.consumerId, { groupRepository } )
    groupId2 = group2.groupId
  })

  afterEach(async ()=>{
    await profileRepository.clean()
  })

  it("Should create a new profile", async ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: 'Administrator',
      userMaxNumber: 1,
      meta: [
        {key: 'tag', value: 'adminGroup'}
      ],
      groupId,
      policies: ['edit', 'delete'],
    }

    const options = {
      groupRepository,
      policyRepository,
      profileRepository
    }

    const profile = await userPool.registerProfile(profileInputPayload, consumerId, options)

    expect(typeof profile.profileId).toBe('string')
  })

  it("Should create two diferent profiles", async ()=>{
    const profileInputPayload1 = {
      name: 'admin',
      description: 'Administrator',
      userMaxNumber: 1,
      meta: [
        {key: 'tag', value: 'adminGroup'}
      ],
      groupId,
      policies: ['edit', 'delete'],
      consumerId
    }
    const profileInputPayload2 = {
      name: 'user',
      description: 'Usuario',
      userMaxNumber: 0,
      meta: [
        {key: 'tag', value: 'userGroup'}
      ],
      groupId,
      policies: ['edit'],
    }
    const options = {
      groupRepository,
      policyRepository,
      profileRepository
    }

    const profile1 = await userPool.registerProfile(profileInputPayload1, consumerId, options)
    const profile2 = await userPool.registerProfile(profileInputPayload2, consumerId, options)

    expect(profile1.profileId).not.toBe(profile2.profileId)
  })

  it("Should not create two profiles with the same name", async ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: 'Administrator',
      userMaxNumber: 1,
      meta: [
        {key: 'tag', value: 'adminGroup'}
      ],
      groupId,
      policies: ['edit', 'delete'],
    }

    const options = {
      groupRepository,
      policyRepository,
      profileRepository
    }

    const profile = await userPool.registerProfile(profileInputPayload, consumerId, options)
    expect( async ()=>{
      await userPool.registerProfile(profileInputPayload, consumerId, options)
    }).rejects.toThrow()
  })

  it("should create identical profiles for diferents consumers", async ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: 'Administrator',
      userMaxNumber: 1,
      meta: [
        {key: 'tag', value: 'adminGroup'}
      ],
      groupId,
      policies: ['edit', 'delete'],
    }
    const options = {
      groupRepository,
      policyRepository,
      profileRepository
    }
    const profile1 = await userPool.registerProfile(profileInputPayload, consumerId, options)
    profileInputPayload.groupId = groupId2
    const profile2 = await userPool.registerProfile(profileInputPayload, consumerId2, options)

    expect(profile1.profileId).not.toBe(profile2.profileId)
  })

  it("Should not register profile in invalid group", async ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: 'Administrator',
      userMaxNumber: 1,
      meta: [
        {key: 'tag', value: 'adminGroup'}
      ],
      groupId: '123',
      policies: ['edit', 'delete'],
    }
    const options = {
      groupRepository,
      policyRepository,
      profileRepository
    }

    expect( async ()=>{
      await userPool.registerProfile(profileInputPayload, consumerId, options)
    }).rejects.toThrow()
  })

  it("Should not register a profile in cros consumer x group", ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: 'Administrator',
      userMaxNumber: 1,
      meta: [
        {key: 'tag', value: 'adminGroup'}
      ],
      groupId,
      policies: ['edit', 'delete'],
    }
    const options = {
      groupRepository,
      policyRepository,
      profileRepository
    }

    expect( async ()=>{
      await userPool.registerProfile(profileInputPayload, consumerId2, options)
    }).rejects.toThrow()
  })
})