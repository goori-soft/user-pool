import { IConsumerRepository, Consumer } from "@/userPool";
import { AccessKey } from "@/userPool";
import { ConsumerSecrets } from "@/userPool/types";
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
  async insert(consumer: Consumer): Promise<ConsumerSecrets>{
    
    const secrets: ConsumerSecrets = {
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

    consumerMemoryDatabase.push(consumerDataRecord)

    return secrets
  }

  async getByEmail(email: string): Promise<Consumer[]>{
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

  async getById(id: string): Promise<Consumer | undefined>{
    const consumerDataRecord = consumerMemoryDatabase.find( dataRecord => dataRecord.id === id)
    if(consumerDataRecord === undefined) return undefined //throw new WebError(`Consumer not found`, 404)
    return this.generateConsumerByDataRecord(consumerDataRecord)
  }

  private generateConsumerByDataRecord(dataRecord: ConsumerDataRecord): Consumer{
    const consumer = new Consumer({...dataRecord})
    const secrets: ConsumerSecrets = {
      id: dataRecord.id,
      secret: dataRecord.secret,
      accessKey: new AccessKey(dataRecord.accesskey)
    }
    consumer.setSecrets(secrets)
    return consumer
  }
}