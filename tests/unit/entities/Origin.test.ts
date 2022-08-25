import { Origin } from "@/userPool/entities/Origin"

describe("origin entity", ()=>{
  it("Should create entities origin from valid lists", ()=>{
    const originLists = [
      ['myhost.com', '*'],
      ['*'],
      ['https://myhost.com'],
      ['http://mysite.pt.com', 'http://sub.mysite.pt.com'],
      ['*.uk.com', '*.br.net', 'http://mysitehttp://']
    ]

    expect( new Origin(originLists[0]) ).toBeInstanceOf(Origin)
    expect( new Origin(originLists[1]) ).toBeInstanceOf(Origin)
    expect( new Origin(originLists[2]) ).toBeInstanceOf(Origin)
    expect( new Origin(originLists[3]) ).toBeInstanceOf(Origin)
    expect( new Origin(originLists[4]) ).toBeInstanceOf(Origin)
  })

  it("Should not create invalid origins", ()=>{
    const originLists = [
      [],
      [''],
      ['https://myhost.com', ''],
      ['*', ''],
      ['http://', '*.br.net']
    ]

    expect(()=>{ new Origin(originLists[0]) }).toThrow()
    expect(()=>{ new Origin(originLists[1]) }).toThrow()
    expect(()=>{ new Origin(originLists[2]) }).toThrow()
    expect(()=>{ new Origin(originLists[3]) }).toThrow()
    expect(()=>{ new Origin(originLists[4]) }).toThrow()
    expect(()=>{ new Origin(originLists[5]) }).toThrow()
  })
})