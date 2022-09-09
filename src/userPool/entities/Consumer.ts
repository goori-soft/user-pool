import { ConsumerData, ConsumerSecrets, ConsumerInputPayload } from '../types'
import { AccessKey } from './AccessKey'
import { Email } from "./Email";
import { Origin } from "./Origin";
import { TextInput } from "./TextInput";
import { WebError } from "./WebError";
import { Tokenizer } from "./Tokenizer";
import { NumberInput } from './NumberInput';

export class Consumer{
  private tokenizer: Tokenizer = new Tokenizer()

  private id: TextInput | undefined
  private name: TextInput
  private email: Email
  private origin: Origin
  private userMaxNumber: NumberInput
  private groupMaxNumber: NumberInput
  private accessKey: AccessKey | undefined
  private secret: TextInput | undefined

  constructor(payload: ConsumerInputPayload){
    this.name = new TextInput(payload.name, 'Name').notBlanck()
    this.email = new Email(payload.email)
    this.origin = new Origin(payload.origin)
    this.userMaxNumber = new NumberInput(payload.userMaxNumber ?? 0).positive()
    this.groupMaxNumber = new NumberInput(payload.groupMaxNumber ?? 0).positive()
  }

  auth(accessKey: string): string{
    if(accessKey !== this.getAccessKey())
      throw new WebError('Wrong id or access key', 401)
    
    const id = this.getId()
    if(!id || !this.secret)
      throw new WebError('This consumer is not initialized', 500)

    const payload = { 
      name: this.name,
      id
    }

    const token = this.tokenizer.sign(payload, this.secret.getValue())
    return token
  }

  getId(): string | undefined{
    return this.id?.getValue()
  }

  getAccessKey(): string | undefined{
    return this.accessKey?.getValue()
  }

  getData(): ConsumerData{
    return {
      name: this.name.getValue(),
      origin: this.origin?.getValue() || [],
      email: this.email.getValue(),
      userMaxNumber: this.userMaxNumber.getValue(),
      groupMaxNumber: this.groupMaxNumber.getValue()
    }
  }

  getSecret(): string | undefined{
    const secret = this.secret?.getValue()
    return secret
  }

  getSecrets(){
    if(!this.isInitialized()) throw new WebError(`Consumer is not initialized`, 500)
    return {
      id: this.id?.getValue(),
      secret: this.secret?.getValue(),
      accessKey: this.accessKey?.getValue()
    }
  }

  setSecrets(secrets: ConsumerSecrets): void {
    if(this.isInitialized()) throw new WebError(`Consumer is already initialized. Consumer secrets can not be reseted`, 500)
    this.id = new TextInput(secrets.id).notBlanck()
    this.secret = new TextInput(secrets.secret).notBlanck()
    this.accessKey = secrets.accessKey
  }

  verify(token: string): boolean{
    try{
      const payload = this.tokenizer.verify(token, this.secret?.getValue() || '')
      return true
    }
    catch(e: any){
      return false
    }
  }

  private isInitialized(): boolean{
    if(this.id || this.secret || this.accessKey) return true
    return false
  }
}