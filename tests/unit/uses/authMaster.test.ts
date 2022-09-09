import userPool from '@/userPool'
import { Event } from '@/userPool/types'
describe("Use case suth master", ()=>{
  const configurationRepository = new userPool.defaultImplementation.ConfigurationRepository()
  const eventBus = new userPool.defaultImplementation.EventBus()
  it("Should authenticated master user", async ()=>{
    const masterPassword = 'Bananas'
    
    await configurationRepository.set('MASTER_ACCESS_KEY', masterPassword)
    const token = await userPool.authMaster(masterPassword, {configurationRepository})

    expect(typeof token).toBe('string')
  })

  it("Should not authenticated master user", async ()=>{
    const masterPassword = 'Bananas'
    
    await configurationRepository.set('MASTER_ACCESS_KEY', 'Apples')
    
    await expect(async ()=> {
      await userPool.authMaster(masterPassword, {configurationRepository})
    }).rejects.toThrow()
  })

  it("Should emit event master authenticated", async ()=>{
    const masterPassword = 'Bananas'
    let eventReceived = undefined
    const expectedEventReceived = {
      name: 'MASTER_AUTHENTICATED',
      identifier: expect.any(String),
      issuedOn: expect.any(String),
      body: {}
    }
    const handler = (event: Event)=>{
      eventReceived = event
    }

    eventBus.on('MASTER_AUTHENTICATED', handler)

    await configurationRepository.set('MASTER_ACCESS_KEY', masterPassword)
    await userPool.authMaster(masterPassword, {configurationRepository, eventBus})

    expect(eventReceived).toMatchObject(expectedEventReceived)
  })
})