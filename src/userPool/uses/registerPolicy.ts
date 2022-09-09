import { Policy } from "../entities"
import { IPolicyRepository } from "../interfaces"
import { PolicyOutPutPayload, PolicyInputPayload } from '../types'

type RegisterPolicyOptions = {
  policyRepository: IPolicyRepository
}

export default async function registerPolicy(policyInputPayload: PolicyInputPayload, consumerId: string, options: RegisterPolicyOptions): Promise<PolicyOutPutPayload> {
  const policyRepository = options.policyRepository
  const policy = new Policy(policyInputPayload, consumerId)
  const policyId = await policyRepository.insert(policy)
  return {policyId}
}