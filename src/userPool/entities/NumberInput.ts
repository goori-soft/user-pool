import { WebError } from "./WebError"

export class NumberInput{
  constructor(private value: string | number, private label = 'The number'){
    this.value = Number(this.value)
    if(isNaN(this.value)) throw new WebError(`${this.label} must be a valid number`, 400)
  }

  positive(): NumberInput{
    if(this.value < 0) throw new WebError(`${this.label} must be positive`, 400)
    return this
  }

  getValue(): number{
    return Number(this.value)
  }
}