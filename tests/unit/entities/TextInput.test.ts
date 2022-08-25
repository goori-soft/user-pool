import { TextInput } from "@/userPool/entities/TextInput"

describe("TextInput Entity", ()=>{
  it("Should create a new valid TextInput", ()=>{
    const input = "John O'Brian"
    const textInput = new TextInput(input)
    expect(textInput.getValue()).toEqual(input)
  })

  it("Should throw error with invalid input", ()=>{
    let input: string
    expect(()=> new TextInput(input)).toThrow()
  })

  it("Should not allow black text", ()=>{
    const input = '  '
    const textInput = new TextInput(input)
    expect(() => textInput.notBlanck()).toThrow()
  })

  it("Should convert number to string", ()=>{
    const input = 123
    const textInput = new TextInput(input)
    expect(typeof textInput.getValue()).toBe('string')
  })

  it("Should not allow numbers", ()=>{
    const input = '123'
    const textInput = new TextInput(input)
    expect(() => textInput.notANumber()).toThrow()
  })
})