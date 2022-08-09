import { Email } from '@/entities/email'

describe("Email entity", ()=>{
  it("Should generate a valid value object", ()=>{
    const emails = [
      'myemail@mail.com',
      'my.email@gmail.com',
      'me@me.com',
    ]

    const email0 = new Email(emails[0])
    const email1 = new Email(emails[1])
    const email2 = new Email(emails[2])
    

    expect(email0.getValue()).toBe(emails[0])
    expect(email1.getValue()).toBe(emails[1])
    expect(email2.getValue()).toBe(emails[2])
    
  })

  it("Should throw error with invalid email", ()=>{
    const emails = [
      'myemail@com',
      'my.email@.com',
      'me.com',
      '',
      'me@me.com; my@my.ui'
    ]

    expect( ()=>{const e = new Email(emails[0])} ).toThrow()
    expect( ()=>{const e = new Email(emails[1])} ).toThrow()
    expect( ()=>{const e = new Email(emails[2])} ).toThrow()
    expect( ()=>{const e = new Email(emails[3])} ).toThrow()
    expect( ()=>{const e = new Email(emails[4])} ).toThrow()
    expect( ()=>{const e = new Email(emails[5])} ).toThrow()
  })
})