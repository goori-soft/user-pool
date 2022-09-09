import { IProfileRepository, Profile } from '@/userPool'
import { MetaData } from '@/userPool/types/MetaData'
import { v4 as uuid }  from 'uuid'

type ProfileDataRecord = {
  name: string,
  description: string,
  meta: MetaData,
  policies: string[],
  groupId: string,
  userMaxNumber: number,
  consumerId: string
}

let profileMemoryDatabase: ProfileDataRecord[] = []

export class ProfileMemoryRepository implements IProfileRepository{
  async insert(profile: any): Promise<string> {
    const id = uuid()
    const profileDataRecord = {
      id,
      ... profile.getData()
    }
    if(await this.getByName(profileDataRecord.name, profileDataRecord.consumerId)) throw new Error(`This profile name already exists`)
    profileMemoryDatabase.push(profileDataRecord)
    return id
  }

  async getByName(name: string, consumerId: string): Promise<Profile | undefined>{
    const profileDataRecord = profileMemoryDatabase.find((profileDataRecord)=>{
      return profileDataRecord.name === name && profileDataRecord.consumerId === consumerId
    })
    if(!profileDataRecord) return
    const profile = new Profile(profileDataRecord, profileDataRecord.consumerId)
    return profile
  }

  async clean(): Promise<void> {
    profileMemoryDatabase = []
  }
}