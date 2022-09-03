import { IConsumerRepository, Consumer } from "@/userPool";
import { AccessKey } from "@/userPool";
import { IConsumerSecrets } from "@/userPool/interfaces/IConsumerSecrets";
import { WebError } from "@/userPool/entities/WebError";
import { v4 as uuid }  from 'uuid'

type ConsumerDataRecord  = {
  id: string
  accesskey: string
  name: string
  email: string
  origin: string[]
  userMaxNumber: number
  groupMaxNumber: number
  secret: string
}

const consumerMemoryDatabase: ConsumerDataRecord[] = []

export class ConsumerMemoryRepository implements IConsumerRepository{
  async save(consumer: Consumer): Promise<IConsumerSecrets>{
    
    const secrets: IConsumerSecrets = {
      id: uuid(),
      accessKey:AccessKey.generateAccessKey(),
      secret: uuid()
    }

    const consumerDataRecord: ConsumerDataRecord = {
      id: secrets.id,
      accesskey: secrets.accessKey.getValue(),
      secret: secrets.secret,
      ... consumer.getData()
    }

    if(await this.emailExists(consumerDataRecord.email)) throw new WebError(`This email is already registered`, 406)
    consumerMemoryDatabase.push(consumerDataRecord)

    return secrets
  }

  async findByEmail(email: string): Promise<Consumer[]>{
    const result = consumerMemoryDatabase.filter( dataRecord => dataRecord.email === email )
    const consumers = result.map( dataRecord => {
      return this.generateConsumerByDataRecord(dataRecord)
    })
    return consumers
  }

  async getAll(): Promise<Consumer[]>{
    const consumers = consumerMemoryDatabase.map((dataRecord)=>{
      return this.generateConsumerByDataRecord(dataRecord)
    })
    return consumers
  }

  private async emailExists(email: string): Promise<boolean>{
    const consumers = await this.findByEmail(email)
    if (consumers.length > 0) return true
    return false
  }

  async findById(id: string): Promise<Consumer>{
    const consumerDataRecord = consumerMemoryDatabase.find( dataRecord => dataRecord.id === id)
    if(consumerDataRecord === undefined) throw new WebError(`Consumer not found`, 404)
    return this.generateConsumerByDataRecord(consumerDataRecord)
  }

  private generateConsumerByDataRecord(dataRecord: ConsumerDataRecord): Consumer{
    const consumer = new Consumer({...dataRecord})
    const secrets: IConsumerSecrets = {
      id: dataRecord.id,
      secret: dataRecord.secret,
      accessKey: new AccessKey(dataRecord.accesskey)
    }
    consumer.setSecrets(secrets)
    return consumer
  }
}