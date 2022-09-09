import { TextInput } from './TextInput'
import { NumberInput } from "./NumberInput";
import { GroupInputPayload, GroupData } from "../types";
import { MetaDataInput } from './MetaDataInput';

export class Group{
  name: TextInput
  description: TextInput
  userMaxNumber: NumberInput
  consumerId: TextInput
  metaData: MetaDataInput

  constructor(payload: GroupInputPayload, consumerId: string){
    this.name = new TextInput(payload.name).notBlanck()
    this.description = new TextInput(payload.description || '')
    this.userMaxNumber = new NumberInput(payload.userMaxNumber).positive()
    this.metaData = new MetaDataInput(payload.meta || [])

    this.consumerId = new TextInput(consumerId).notBlanck()
  }

  getData(): GroupData{
    return {
      name: this.name.getValue(),
      description: this.description.getValue(),
      userMaxNumber: this.userMaxNumber.getValue(),
      meta: this.metaData.getData(),
      consumerId: this.consumerId.getValue()
    }
  }
}