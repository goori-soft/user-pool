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
})