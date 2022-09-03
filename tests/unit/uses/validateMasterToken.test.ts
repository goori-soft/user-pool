import userPool from "@/userPool"
import { MockConfigurationRepository } from '../../mocks/mockConfigurationRepository'

describe("Use case validate Master Token", ()=>{
  const configurationRepository = new MockConfigurationRepository()
  let validToken: string

  beforeAll(async ()=>{
    const masterPassword = await configurationRepository.get('MASTER_ACCESS_KEY')
    validToken = await userPool.authMaster(masterPassword, {configurationRepository})
  })

  it("Should validate a valid token", async ()=>{
    const validated = await userPool.validateMasterToken(validToken, {configurationRepository})
    expect(validated).toBe(true)
  })

  it("Should not validate a valid token", async ()=>{
    const invalidToken = ''
    const validated = await userPool.validateMasterToken(invalidToken, {configurationRepository})
    expect(validated).toBe(false)
  })
})