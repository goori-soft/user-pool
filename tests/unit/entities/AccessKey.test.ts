import { AccessKey } from '@/userPool/entities/AccessKey'

describe("Access Key entity", ()=>{
  it("Should generate a new access key", ()=>{
    const accessKey = AccessKey.generateAccessKey()
    expect(accessKey instanceof AccessKey).toBe(true)
    expect(typeof accessKey.getValue()).toBe('string')
  })

  it("Should generate randon keys", ()=>{
    const accessKey1 = AccessKey.generateAccessKey()
    const accessKey2 = AccessKey.generateAccessKey()

    const totalKeys = 100
    const keys: string[] = []
    for(let i = 0; i < totalKeys; i++){
      const accessKey = AccessKey.generateAccessKey()
      keys.push(accessKey.getValue())
    }
    const keySet = new Set(keys)
    
    expect(keySet.size).toEqual(keys.length)
  })

  it("Should generate a valid key for any instance", ()=>{
    const accessKey1 = AccessKey.generateAccessKey()
    const accessKey2 = new AccessKey(accessKey1.getValue())

    expect(accessKey1.getValue()).toBe(accessKey2.getValue())
  })
})