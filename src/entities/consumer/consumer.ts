import { IConsumerPayload } from "@/entities/interfaces/IConsumerPayload";
import { IConsumerRepository } from "@/entities/interfaces/IConsumerRepository";
import { AccessKey } from '@/entities/accessKey'
import { Email } from "@/entities/email";
import { Origin } from "@/entities/origin";
import { WebError } from "@/entities/webError";

export class Consumer{
  private accessKey: AccessKey | undefined
  private email: Email | undefined
  private origin: Origin | undefined
  
  constructor(
    private payload: IConsumerPayload,
    private repository: IConsumerRepository
  ){
    if(!this.payload.name || !this.payload.name.toString().trim()) throw new WebError(`Consumer requires a name`, 400)
    this.email = new Email(this.payload.email)
    this.origin = new Origin(this.payload.origin)
    this.setAcessKey()
  }

  async save(): Promise<void>{
    if(!this.payload.accessKey) this.payload.accessKey = this.generateAccessKey().getValue()
    const id = await this.repository.save(this.payload)
    this.payload.id = id
  }

  getId(): string | undefined{
    return this.payload.id
  }

  getAccessKey(): string | undefined{
    return this.payload.accessKey
  }

  private generateAccessKey(): AccessKey{
    return AccessKey.generateAccessKey()
  }

  private setAcessKey(): void{
    if(!this.payload.accessKey){
      this.accessKey = this.generateAccessKey()
      this.payload.accessKey = this.accessKey.getValue()
    }
    else{
      this.accessKey = new AccessKey(this.payload.accessKey)
    }
  }
}