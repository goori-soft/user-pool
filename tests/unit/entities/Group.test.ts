import group from "@/server/routes/group"
import { Group } from "@/userPool"

describe("Group entity", ()=>{
  const consumerId: string = '123'
  it("Should create a valid group instance", async ()=>{
    const groupInputPayload = {
      name: 'myGroup',
      description: 'A simple group for testing',
      userMaxNumber: 0
    }
    const group = new Group(groupInputPayload, consumerId)
    expect(group).toBeInstanceOf(Group)
  })

  it("Should not create a group with empty name", async ()=>{
    const groupInputPayload = {
      name: ' ',
      description: '',
      userMaxNumber: 0
    }
    
    expect( ()=>{
      const group = new Group(groupInputPayload, consumerId)
    } ).toThrow()
  })

  it("Should not create a group with negative user max number", async ()=>{
    const groupInputPayload = {
      name: ' Name',
      description: '',
      userMaxNumber: -1
    }

    expect( ()=>{
      const group = new Group(groupInputPayload, consumerId)
    } ).toThrow()
  })

  it("Props should be immutable", ()=>{
    const groupInputPayload = {
      name: 'myGroup',
      description: 'This is my group',
      userMaxNumber: 1,
      meta: [
        {key: 'type', value: 'soccer'}
      ]
    }

    const group = new Group(groupInputPayload, consumerId)
    groupInputPayload.name = 'otherGroup'
    groupInputPayload.description = 'This is other group'
    groupInputPayload.userMaxNumber = 2
    groupInputPayload.meta[0].key = 'address'
    groupInputPayload.meta[0].value = 'Str. Zero One'
    
    const groupData = group.getData()

    expect(groupData.name).not.toBe(groupInputPayload.name)
    expect(groupData.description).not.toBe(groupInputPayload.description)
    expect(groupData.userMaxNumber).not.toBe(groupInputPayload.userMaxNumber)
    expect(groupData.meta[0].key).not.toBe(groupInputPayload.meta[0].key)
    expect(groupData.meta[0].value).not.toBe(groupInputPayload.meta[0].value)
  })
})