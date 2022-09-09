import { IPolicyRepository, Policy } from "@/userPool";
import { v4 as uuid }  from 'uuid'

type PolicyDataRecord = {
  id: string,
  identifier: string,
  name: string,
  description: string,
  consumerId: string
}

let policyMemoryDatabase: PolicyDataRecord[] = []

export class PolicyMemoryRepository implements IPolicyRepository{
  async insert(policy: Policy): Promise<string> {
    const id = uuid()
    policy.setId(id)
    const policyData = policy.getData()

    if(await this.policyExists(policyData.identifier, policyData.consumerId)) throw new Error(`The policy '${policyData.identifier}' already exists fo this consumer`)

    policyMemoryDatabase.push(policyData)
    return policyData.id
  }

  private async policyExists(identifier: string, consumerId: string): Promise<boolean>{
    const policyDataRecord = policyMemoryDatabase.find( dataRecord => {
      return dataRecord.identifier === identifier && dataRecord.consumerId === consumerId
    })
    if(policyDataRecord) return true
    return false
  }

  async clean(): Promise<void> {
    policyMemoryDatabase = []
  }
}