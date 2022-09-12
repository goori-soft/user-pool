import { IGroupRepository, Group } from '@/userPool'
import { v4 as uuid }  from 'uuid'

type GroupDataRecord = {
  id: string
  name: string
  description?: string
  userMaxNumber: number
  consumerId: string
}

let groupMemoryDatabase: GroupDataRecord[] = []

export class GroupMemoryRepository implements IGroupRepository{
  async insert(group: Group): Promise<string>{
    const id = uuid()
    const groupDataRecord: GroupDataRecord = {
      id,
      ...group.getData()
    }

    groupMemoryDatabase.push(groupDataRecord)

    return id
  }

  async getById(groupId: string, consumerId: string): Promise<Group | undefined> {
    const groupDataRecord = groupMemoryDatabase.find(groupDataRecord =>{
      return groupDataRecord.id === groupId && groupDataRecord.consumerId === consumerId
    })
    if(!groupDataRecord) return undefined
    const group = new Group(groupDataRecord, groupDataRecord.consumerId)
    return group
  }

  async clean(): Promise<void> {
    groupMemoryDatabase = []
  }
}