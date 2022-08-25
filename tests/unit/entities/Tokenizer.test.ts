import { Tokenizer } from "@/userPool/entities/Tokenizer"
describe("Master tokenizer adapter", ()=>{
  const secret = 'BANANAS'
  it("Should create a valid token", ()=>{
    const tokenizer = new Tokenizer()
    const payload = {name: 'John McCay'}

    const token = tokenizer.sign(payload, secret)
    
    expect(typeof token).toBe('string')
    const tokenParts = token.split('.')
    expect(tokenParts.length).toBe(3)
  })

  it("Should create and verify a valid token", ()=>{
    const tokenizer = new Tokenizer()
    const payload = {name: 'John McCay'}

    const token = tokenizer.sign(payload, secret)
    expect(typeof token).toBe('string')
    
    const reversePayload = tokenizer.verify(token, secret)
    expect(reversePayload).toMatchObject(payload)
  })

  it("Should not verify a token with invalid secret", ()=>{
    const tokenizer = new Tokenizer()
    const payload = {name: 'John McCay'}
    
    const token = tokenizer.sign(payload, secret)
    expect(typeof token).toBe('string')

    expect(()=>{tokenizer.verify(token, 'APPLES')}).toThrow()
  })
})