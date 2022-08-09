import { WebError } from '@/entities/webError'

export class Host{

  constructor(private host: string){
    this.validate()
  }

  validate(): void{
    const errorMessage = `host '${this.host}' is not a valid string`
    if(!this.host || typeof this.host != 'string') throw new WebError(errorMessage, 400)
    
    this.host = this.host.replace(/^https?:\/\//, '')
    if(!this.host) throw new WebError(errorMessage, 400)
  }

  getValue(): string{
    return this.host
  }
}