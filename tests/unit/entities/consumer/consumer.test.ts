import { WebError } from '@/entities/webError'
import { Consumer } from '@/entities/consumer'
import { ConsumerRepositoryMock } from '../../../mocks/consumerRepositoryMock'
describe("Consumer entity", ()=>{
  it("Should create a new consumer entity from valid payload", async ()=>{
    const validPayload = {
      name: 'myApp',
      email: 'mayApp@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const repository = new ConsumerRepositoryMock()
    const consumer = new Consumer(validPayload, repository)
    await consumer.save()
    const id = consumer.getId()
    const accessKey = consumer.getAccessKey()

    expect(typeof id).toBe('string')
    expect(typeof accessKey).toBe('string')
  })
})