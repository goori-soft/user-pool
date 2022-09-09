import { Profile } from "@/userPool"

describe("Profile entity", ()=>{
  const groupId = '123'
  const consumerId = '123'
  it("Should create a valid profile", ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: "System's administrator",
      userMaxNumber: 1,
      meta: [{key: 'tag', value: 'admin'}],
      groupId,
      policies: ['edit']
    }

    const profile = new Profile(profileInputPayload, consumerId)
    const profileData = profile.getData()

    const expectedProfileData  = {
      name: 'admin',
      description: "System's administrator",
      userMaxNumber: 1,
      meta: [{key: 'tag', value: 'admin'}],
      groupId: '123',
      policies: ['edit']
    }

    expect(profileData).toMatchObject(expectedProfileData)
  })

  it("Should not create a profile with invalid name", ()=>{
    const profileInputPayload = {
      name: ' ',
      description: "System's administrator",
      userMaxNumber: 1,
      meta: [{key: 'tag', value: 'admin'}],
      groupId,
      policies: ['edit']
    }

    expect(()=>{
      const profile = new Profile(profileInputPayload, consumerId)
    }).toThrow()
  })

  it("Should not create a profile without a groupId", ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: "System's administrator",
      userMaxNumber: 1,
      meta: [{key: 'tag', value: 'admin'}],
      policies: ['edit']
    }

    expect(()=>{
      const profile = new Profile(profileInputPayload, consumerId)
    }).toThrow()
  })

  it("Should not create a profile with negative user max number", ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: "System's administrator",
      userMaxNumber: -1,
      meta: [{key: 'tag', value: 'admin'}],
      groupId,
      policies: ['edit']
    }

    expect(()=>{
      const profile = new Profile(profileInputPayload, consumerId)
    }).toThrow()
  })

  it("Props should be immutable", ()=>{
    const profileInputPayload = {
      name: 'admin',
      description: "System's administrator",
      userMaxNumber: 1,
      meta: [{key: 'tag', value: 'admin'}],
      groupId,
      policies: ['edit']
    }

    const profile = new Profile(profileInputPayload, consumerId)
    profileInputPayload.name = 'user'
    profileInputPayload.description = 'Just a user'
    profileInputPayload.userMaxNumber = 2
    profileInputPayload.meta[0].key = 'type'
    profileInputPayload.meta[0].value = 'single'
    profileInputPayload.groupId = 'abc'
    profileInputPayload.policies[0] = 'delete'

    const profileData = profile.getData()

    expect(profileData.name).not.toBe(profileInputPayload.name)
    expect(profileData.description).not.toBe(profileInputPayload.description)
    expect(profileData.userMaxNumber).not.toBe(profileInputPayload.userMaxNumber)
    expect(profileData.meta[0].key).not.toBe(profileInputPayload.meta[0].key)
    expect(profileData.meta[0].value).not.toBe(profileInputPayload.meta[0].value)
    expect(profileData.groupId).not.toBe(profileInputPayload.groupId)
    expect(profileData.policies[0]).not.toBe(profileInputPayload.policies[0])
  })
})