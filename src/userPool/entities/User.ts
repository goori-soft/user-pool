import { UserData, UserInputPayload } from "../types";
import { Email } from "./Email";
import { MetaDataInput } from "./MetaDataInput";
import { Password } from "./Password";
import { TextInput } from "./TextInput";

export class User{
  name: TextInput
  email: Email
  consumer: TextInput
  password: Password
  metaData: MetaDataInput

  constructor(payload: UserInputPayload, consumerId: string){
    this.name = new TextInput(payload.name, 'User name').notBlanck()
    this.email = new Email(payload.email)
    this.consumer = new TextInput(consumerId, 'Consumer id')
    this.password = new Password(payload.password || '')
    this.metaData = new MetaDataInput(payload.meta || [])
  }

  getData(): UserData{
    return {
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdBy: this.consumer.getValue(),
      meta: this.metaData.getData(),
      encodedPassword: this.password.getEncrypted(),
      salt: this.password.getSalt()
    }
  }
}