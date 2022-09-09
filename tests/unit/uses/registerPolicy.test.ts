import { MainMemoryFactory } from "@/factories"
import userPool from "@/userPool"
import { ConsumerAuthKeys } from '@/userPool/types'
import { consumerInputPayload, consumerInputPayload2 } from "../../mocks/consumerInputPayload"

describe("Use case register policy", ()=>{
  let consumerAuthKeys: ConsumerAuthKeys
  let consumerAuthKeys2: ConsumerAuthKeys
  const mainFactory = new MainMemoryFactory()
  const consumerRepository = mainFactory.createConsumerRepository()
  const policyRepository = mainFactory.createPolicyRepository()

  beforeAll(async ()=>{  
    consumerAuthKeys = await userPool.registerConsumer(consumerInputPayload, { consumerRepository })
    consumerAuthKeys2 = await userPool.registerConsumer(consumerInputPayload2, { consumerRepository })
  })

  afterEach(async ()=>{
    policyRepository.clean()
  })
  it("Should register a new policy", async ()=>{
    const policyInputPayload = {
      identifier: 'edit',
      name: 'Edit',
      description: 'Enable user to edit something here'
    }
    const policyOutPuPayload = await userPool.registerPolicy(policyInputPayload, consumerAuthKeys.consumerId, { policyRepository })

    expect(policyOutPuPayload).toMatchObject({policyId: expect.any(String)})
    expect(typeof policyOutPuPayload.policyId).toBe('string')
  })

  it("Should not register tow policies with the same identifier per consumerId", async ()=>{
    const policyInputPayload = {
      identifier: 'edit',
      name: 'Edit',
      description: 'Enable user to edit something here'
    }
    const policyOutPuPayload = await userPool.registerPolicy(policyInputPayload, consumerAuthKeys.consumerId, { policyRepository })
    expect(async ()=>{
      await userPool.registerPolicy(policyInputPayload, consumerAuthKeys.consumerId, { policyRepository })
    }).rejects.toThrow()
  })

  it("Should generate diferent ids for diferent policies", async ()=>{
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

    const policyOutPuPayload1 = await userPool.registerPolicy(policyInputPayload1, consumerAuthKeys.consumerId, { policyRepository })
    const policyOutPuPayload2 = await userPool.registerPolicy(policyInputPayload2, consumerAuthKeys.consumerId, { policyRepository })

    expect(policyOutPuPayload1.policyId).not.toBe(policyOutPuPayload2.policyId)
  })

  it("Should register the same policy for diferents consumers", async ()=>{
    const policyInputPayload = {
      identifier: 'edit',
      name: 'Edit',
      description: 'Enable user to edit something here'
    }
    const policyOutPuPayload = await userPool.registerPolicy(policyInputPayload, consumerAuthKeys.consumerId, { policyRepository })
    const policyOutPuPayload2 = await userPool.registerPolicy(policyInputPayload, consumerAuthKeys2.consumerId, { policyRepository })

    expect(policyOutPuPayload.policyId).not.toBe(policyOutPuPayload2.policyId)
  })
})