import { IGroupRepository, Group } from '@/userPool'
import { v4 as uuid }  from 'uuid'

type GroupDataRecord = {
  id: string
  name: string
  description?: string
  userMaxNumber: number
  consumerId: string
}

const groupMemoryDatabase: GroupDataRecord[] = []

export class GroupMemoryRepository implements IGroupRepository{
  async save(group: Group): Promise<string>{
    const id = uuid()
    const groupDataRecord: GroupDataRecord = {
      id,
      ...group.getData()
    }

    groupMemoryDatabase.push(groupDataRecord)

    return id
  }
}