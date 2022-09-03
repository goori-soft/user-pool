import { IConsumerData, IConsumerInputPayload, IConsumerSecrets} from "../interfaces";
import { AccessKey } from './AccessKey'
import { Email } from "./Email";
import { Origin } from "./Origin";
import { TextInput } from "./TextInput";
import { WebError } from "./WebError";
import { Tokenizer } from "./Tokenizer";

export class Consumer{
  private accessKey: AccessKey | undefined
  private email: Email | undefined
  private origin: Origin | undefined
  private name: TextInput | undefined
  private id: TextInput | undefined
  private tokenizer: Tokenizer = new Tokenizer()
  private secret: TextInput | undefined

  constructor(
    private payload: IConsumerInputPayload
  ){
    this.name = new TextInput(this.payload.name).notBlanck()
    this.email = new Email(this.payload.email)
    this.origin = new Origin(this.payload.origin)
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

  getData(): IConsumerData{
    return {
      name: this.name?.getValue() || '',
      origin: this.origin?.getValue() || [],
      email: this.email?.getValue() || '',
      userMaxNumber: this.payload.userMaxNumber,
      groupMaxNumber: this.payload.groupMaxNumber
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

  setSecrets(secrets: IConsumerSecrets): void {
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