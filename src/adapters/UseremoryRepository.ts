import { IUserRepository, User } from "@/userPool";
import { v4 as uuid }  from 'uuid'

type UserDataRecord = {
  id: string,
  name: string,
  email: string,
  encodedPassword: string | null,
  salt: string,
  meta: any[],
  createdBy: string,
}

let userMemoryDatabase: UserDataRecord[] = []

export class UserMemoryRepository implements IUserRepository{
  async insert(user: User){
    const userData = user.getData()
    const id = uuid()
    const userDataRecord = {
      id,
      ...userData
    }
    userMemoryDatabase.push(userDataRecord)
    return id
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const userDataRecord = userMemoryDatabase.find( userDataRecord =>{
      return userDataRecord.email === email
    })
    if(!userDataRecord) return undefined
    return this.generateUserFromDataRecord(userDataRecord)
  }

  async clean(): Promise<void>{
    userMemoryDatabase = []
  }

  private generateUserFromDataRecord(userDataRecord: UserDataRecord): User{
    const user = new User(userDataRecord, userDataRecord.createdBy)
    return user
  }
}