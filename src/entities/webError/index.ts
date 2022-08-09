declare global{
  interface Error{
    getMessages(): string[]
  }
}

Error.prototype.getMessages = function(){
  return [this.message]
}

export class WebError extends Error{
  private errorPile: Error[] = []

  constructor(public message: string, public statusCode: number = 500){
    super(message)
  }

  merge(e: Error): void{
    this.errorPile.push(e)
  }

  getMessages(): string[]{
    const errors: string[] = []
    for(let e of this.errorPile){
      errors.push(...e.getMessages())
    }
    errors.push(this.message)
    return errors
  }

  toString(): string{
    return `Error ${this.statusCode}: ${this.message}`
  }
}
