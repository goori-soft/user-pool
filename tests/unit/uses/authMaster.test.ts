import userPool from '@/userPool'
import { MockConfigurationRepository } from '../../mocks/mockConfigurationRepository'
describe("Use case suth master", ()=>{
  it("Should authenticated master user", async ()=>{
    const mockConfigurationRepository = new MockConfigurationRepository()
    const masterPassword = 'Bananas'
    
    await mockConfigurationRepository.set('MASTER_ACCESS_KEY', masterPassword)
    const token = await userPool.authMaster(masterPassword, {configurationRepository: mockConfigurationRepository})

    expect(typeof token).toBe('string')
  })

  it("Should not authenticated master user", async ()=>{
    const mockConfigurationRepository = new MockConfigurationRepository()
    const masterPassword = 'Bananas'
    
    await mockConfigurationRepository.set('MASTER_ACCESS_KEY', 'Apples')
    
    await expect(async ()=> {
      await userPool.authMaster(masterPassword, {configurationRepository: mockConfigurationRepository})
    }).rejects.toThrow()
  })
})