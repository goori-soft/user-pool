import { AccessKey } from '@/userPool/entities/AccessKey'
import { Consumer } from '@/userPool/entities/Consumer'
import { validAcessKeyArray } from '../../mocks/acessKey'
describe("Consumer entity", ()=>{
  const validSecrets = {
    secret: 'apples',
    accessKey: new AccessKey(validAcessKeyArray[0]),
    id: 'bananas'
  }

  it("Should create a new consumer entity from valid payload", ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const consumer = new Consumer(validPayload)
    expect(()=> consumer.getSecrets()).toThrow()
  })

  it("Should create a new consumer entity and set a new AccessKey, Id and Secret", ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const consumer = new Consumer(validPayload)
    consumer.setSecrets(validSecrets)

    const accessKey = consumer.getAccessKey()
    const id = consumer.getId()
    const secret = consumer.getSecret()
    expect(typeof accessKey).toBe('string')
    expect(accessKey).toEqual(validAcessKeyArray[0])
    expect(id).toBe(validSecrets.id)
    expect(secret).toBe(validSecrets.secret)
  })

  it("Should not allow reset secrets in consumer", ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const consumer = new Consumer(validPayload)
    consumer.setSecrets(validSecrets)

    const accessKey = consumer.getAccessKey()
    expect(typeof accessKey).toBe('string')
    expect(accessKey).toEqual(validAcessKeyArray[0])
    expect(()=> consumer.setSecrets({id: 'a', accessKey: new AccessKey(validAcessKeyArray[1]), secret: 'a'})).toThrow()
  })

  it("Should not allow external accessKey in constructor", ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0,
      accessKey: validAcessKeyArray[0]
    }

    const consumer = new Consumer(validPayload) 

    expect(typeof consumer.getAccessKey()).toBe('undefined')
  })

  it("Should not allow external id in constructor", ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0,
      id: 'AAAA'
    }

    const consumer = new Consumer(validPayload)

    expect(typeof consumer.getId()).toBe('undefined')
  })

  it("Should not allow external secret in constructor", ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0,
      secret: 'AAAA'
    }

    const consumer = new Consumer(validPayload)

    expect(typeof consumer.getSecret()).toBe('undefined')
  })

  it("Should return a valid consumer DTO", ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0,
    }

  
    const consumer = new Consumer(validPayload)
    consumer.setSecrets(validSecrets)
    const consumerData = consumer.getData() as any

    expect(consumerData).toMatchObject(validPayload)
    expect(consumerData.id).toBe(undefined)
    expect(consumerData.secret).toBe(undefined)
    expect(consumerData.accessKey).toBe(undefined)
  })

  it("Should return a valid auth token", ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0,
    }
    

    const consumer = new Consumer(validPayload)
    consumer.setSecrets(validSecrets)
    const token = consumer.auth(validAcessKeyArray[0])

    expect(typeof token).toBe('string')
  })

  it("Should not return a valid auth token", ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0,
    }
    
    const consumer = new Consumer(validPayload)
    expect(()=> consumer.auth(validAcessKeyArray[0])).toThrow()
  })

})