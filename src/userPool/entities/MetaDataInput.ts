import { MetaData } from "../types/MetaData";

type MetaDataValue = string | number | undefined

type MetaDataStructure = {
  [key: string]: MetaDataValue
}

export class MetaDataInput{
  metaDataStructure: MetaDataStructure = {}

  constructor(metaDataPayload: MetaData[]){
    this.fill(metaDataPayload)
  }

  private fill(metaDataPayload: MetaData[]){
    metaDataPayload.map(metaData =>{
      this.set(metaData.key, metaData.value)
    })
  }

  private set(key: string, value: MetaDataValue){
    this.metaDataStructure[key] = value
  }

  parse(): MetaDataStructure{
    return {...this.metaDataStructure}
  }

  getData(): MetaData[]{
    const metaData: MetaData[] = []
    for(let key in this.metaDataStructure){
      const metaDataItem = {key, value: this.metaDataStructure[key]}
      metaData.push(metaDataItem)
    }
    return metaData
  }
}