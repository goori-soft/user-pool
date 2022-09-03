import { IGroupInputPayload } from "../interfaces";
import { TextInput } from './TextInput'
import { NumberInput } from "./NumberInput";
import { IGroupData } from "../interfaces/IGroupData";

export class Group{
  name: TextInput
  description: TextInput
  userMaxNumber: NumberInput

  constructor(private payload: IGroupInputPayload, private consumerId: string){
    this.name = new TextInput(payload.name).notBlanck()
    this.description = new TextInput(payload.description || '')
    this.userMaxNumber = new NumberInput(payload.userMaxNumber).positive()
  }

  getData(): IGroupData{
    return {
      name: this.name.getValue(),
      description: this.description.getValue(),
      userMaxNumber: this.userMaxNumber.getValue(),
      meta: this.payload.meta || [],
      consumerId: this.consumerId
    }
  }
}