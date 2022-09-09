import userPool from "@/userPool"

describe("EventBus implementation", ()=>{
  const eventBus = new userPool.defaultImplementation.EventBus()

  it("Should emit a single event", ()=>{
    let eventReceived = null
    const expectedEventReceived = {
      identifier: expect.any(String),
      issuedOn: expect.any(String),
      name: 'SINGLE_EVENT',
      body: 'simple message'
    }
    const handler = (event: any)=>{
      eventReceived = event
    }

    eventBus.on('SINGLE_EVENT', handler)
    eventBus.emit('SINGLE_EVENT', 'simple message')

    expect(eventReceived).toMatchObject(expectedEventReceived)
  })
})