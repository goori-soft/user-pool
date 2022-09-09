import { MetaDataInput } from "@/userPool/entities/MetaDataInput"

describe("MetaDataInput entity", ()=>{
  it("Should create a new MetaDataInput", ()=>{
    const meta = [
      {key: 'type', value: 'soccer'},
      {key: 'address', value: 'Str. Zero One'},
      {key: 'phone'}
    ]

    const metaData = new MetaDataInput(meta)
    const expectedMetaDataParsed = {
      type: 'soccer',
      address: 'Str. Zero One',
      phone: undefined
    }

    const expectMetaData = [
      {key: 'type', value: 'soccer'},
      {key: 'address', value: 'Str. Zero One'},
      {key: 'phone'}
    ]
    
    expect(metaData.parse()).toMatchObject(expectedMetaDataParsed)
    expect(metaData.getData()).toMatchObject(expectMetaData)
  })
})