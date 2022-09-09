import { ProfileData } from "../types";
import { MetaDataInput } from "./MetaDataInput";
import { NumberInput } from "./NumberInput";
import { TextInput } from "./TextInput";

export class Profile{
  private name: TextInput
  private description: TextInput
  private groupId: TextInput
  private userMaxNumber: NumberInput
  private consumserId: TextInput
  private metaData: MetaDataInput
  private policies: string[]

  constructor(payload: any, consumerId: string){
    this.name = new TextInput(payload.name, 'Profile name').notBlanck()
    this.description = new TextInput(payload.description || '', 'Profile description')
    this.groupId = new TextInput(payload.groupId, 'Group Id').notBlanck()
    this.userMaxNumber = new NumberInput(payload.userMaxNumber, 'User max number').positive()
    this.consumserId = new TextInput(consumerId, 'Consumer Id').notBlanck()
    this.metaData = new MetaDataInput(payload.meta || [])
    this.policies = [...payload.policies]
  }

  getData(): ProfileData{
    return {
      name: this.name.getValue(),
      description: this.description.getValue(),
      groupId: this.groupId.getValue(),
      userMaxNumber: this.userMaxNumber.getValue(),
      meta: this.metaData.getData(),
      policies: [...this.policies],
      consumerId: this.consumserId.getValue()
    }
  }
}