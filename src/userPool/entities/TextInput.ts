import { WebError } from "./WebError"

export class TextInput{
  constructor(readonly value: string | number){
    const valueType = typeof(this.value)
    if(valueType !== 'string' && valueType !== 'number') throw new WebError(`Input text has received a invalid type: ${valueType}`, 400)
  }

  getValue(): string{
    return this.value.toString()
  }

  notBlanck(): TextInput{
    const value = this.getValue()
    if(value.trim() === '') throw new WebError(`Input text should not be blank`, 400)
    return this
  }

  notANumber(): TextInput{
    const value = this.getValue()
    const valueAsNumber = parseFloat(value)
    if( !isNaN(valueAsNumber) ) throw new WebError(`Input text should not be a number`, 400)
    return this
  }
}