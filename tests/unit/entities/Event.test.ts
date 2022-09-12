import {Event} from '@/userPool'
describe("Event entity", ()=>{
  it("Should create a valid event", ()=>{
    const message = 'simple message'
    const eventName = 'SIMPLE_EVENT'
    const event = new Event(eventName, message)
    const eventData = event.getData()
    const expectedData = {
      name: 'SIMPLE_EVENT',
      issuedOn: expect.any(String),
      identifier: expect.any(String),
      body: 'simple message'
    }

    expect(eventData).toMatchObject(expectedData)
  })
})