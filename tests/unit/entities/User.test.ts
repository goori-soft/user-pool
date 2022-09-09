import { User } from "@/userPool"

describe("User entity", ()=>{
  it("should create a user", ()=>{
    const userInputPayload = {
      name: 'John',
      email: 'john@john.com',
      password: 'John#123',
      meta: [
        {key: 'language', value: 'pt'},
        {key: 'address', value: 'Str. Zero One, Unsburg BR'},
      ]
    }
    const consumerId = '123'

    const expectedUserData = {
      name: 'John',
      email: 'john@john.com',
      encodedPassword: expect.any(String),
      meta: [
        {key: 'language', value: 'pt'},
        {key: 'address', value: 'Str. Zero One, Unsburg BR'},
      ],
      createdBy: consumerId
    }

    const user = new User(userInputPayload, consumerId)
    const userData = user.getData()

    expect(userData).toMatchObject(expectedUserData)
    expect(userData.encodedPassword).not.toBe(userInputPayload.password)
  })

  it("Props should be immutable", ()=>{
    const userInputPayload = {
      name: 'John',
      email: 'john@john.com',
      password: 'John#123',
      meta: [
        {key: 'language', value: 'pt'},
      ]
    }
    const consumerId = '123'
    const user = new User(userInputPayload, consumerId)
    userInputPayload.name = 'Brian'
    userInputPayload.email = 'brian@brian.com'
    userInputPayload.password = 'brian#124'
    userInputPayload.meta[0].key = 'address' 
    userInputPayload.meta[0].value = 'Str. Zero One, Unsburg BR'
    const userData = user.getData()

    expect(userData.name).not.toBe(userInputPayload.name)
    expect(userData.email).not.toBe(userInputPayload.email)
    expect(userData.encodedPassword).not.toBe(userInputPayload.password)
    expect(userData.meta[0].key).not.toBe(userInputPayload.meta[0].key)
    expect(userData.meta[0].value).not.toBe(userInputPayload.meta[0].value)
  })
})