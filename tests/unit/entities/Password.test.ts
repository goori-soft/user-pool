import { Password } from "@/userPool"

describe("Password entity", ()=>{
  it("Should create a passowrd instance", ()=>{
    const plainPass = '123'
    const password = new Password(plainPass)

    expect(password.compare('123')).toBe(true)
    expect(password.compare('abc')).toBe(false)
    expect(password.getEncrypted()).not.toBe('123')
    expect(typeof password.getSalt()).toBe('string')
  })

  it("Should altenticated a pass", ()=>{
    const plainPass = 'abc'
    const password = new Password(plainPass)
    const salt = password.getSalt()
    const encrypted = password.getEncrypted()

    const passwordEncrypted = Password.createEncryptedPassword(encrypted, salt)
    expect(passwordEncrypted.compare(plainPass)).toBe(true)
    expect(passwordEncrypted.compare('123')).toBe(false)
  })
})