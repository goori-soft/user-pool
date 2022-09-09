import { PolicyData, PolicyInputPayload } from '../types'
import { TextInput } from "./TextInput";

export class Policy{
  identifier: TextInput
  name: TextInput
  description: TextInput
  consumerId: TextInput
  id: TextInput | undefined

  constructor(payload: PolicyInputPayload, consumerId: string){
    this.identifier = new TextInput(payload.identifier)
    this.name = new TextInput(payload.name)
    this.description = new TextInput(payload.description || '')
    this.consumerId = new TextInput(consumerId)
  }

  setId(id: string){
    this.id = new TextInput(id).notBlanck()
  }

  getData(): PolicyData{
    return {
      id: this.id?.getValue() || '',
      identifier: this.identifier.getValue(),
      name: this.name.getValue(),
      description: this.description.getValue(),
      consumerId: this.consumerId.getValue()
    }
  }
}