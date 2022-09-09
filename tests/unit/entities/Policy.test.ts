import { Policy } from "@/userPool"

describe("Policy entity", ()=>{
  it("Should create a new policy", ()=>{
    const policyInputPayload = {
      identifier: 'edit',
      name: 'Edit',
      description: 'Enable user to edity something here'
    }
    const consumerId = 'myapp'
    const policy = new Policy(policyInputPayload, consumerId)
    const policyData = policy.getData()

    const expectedData = {
      id: '',
      identifier: policyInputPayload.identifier,
      name: policyInputPayload.name,
      description: policyInputPayload.description,
      consumerId
    }

    expect(policyData).toMatchObject(expectedData)
  })

  it("Props should be immutable", ()=>{
    const policyInputPayload = {
      identifier: 'edit',
      name: 'Edit',
      description: 'Enable user to edity something here'
    }
    const consumerId = 'myapp'
    const policy = new Policy(policyInputPayload, consumerId)
    policyInputPayload.identifier = 'delete'
    policyInputPayload.name = 'Delete'
    policyInputPayload.description = 'Enable user to delete something'
    const policyData = policy.getData()

    expect(policyData.identifier).not.toBe(policyInputPayload.identifier)
    expect(policyData.name).not.toBe(policyInputPayload.name)
    expect(policyData.description).not.toBe(policyInputPayload.description)
  })
})