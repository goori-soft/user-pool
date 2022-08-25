import { WebError } from "./WebError"

export class Email{
  private emailRegexValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private email: string){
    this.validate()
  }

  getValue(): string{
    return this.email
  }

  private validate(): void{
    try{
      const isValid = this.email
        .toLowerCase()
        .match(this.emailRegexValidator)
      if(!isValid) throw new WebError(`'${this.email}' is not a valid email`, 400)
    }
    catch{
      throw new WebError(`Email is not a valid email`, 400)
    }
  }
}