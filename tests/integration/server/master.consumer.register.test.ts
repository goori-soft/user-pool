import request from 'supertest'
import app from '@/server/app'
import { validMasterAccessToken, invalidMasterAccessToken } from '../../mocks/masterAccessToken'

describe("Consumer register: POST master/consumer/register", ()=>{
  const validHeaders = {'x-master-access-token': validMasterAccessToken}
  const invalidHeaders = {'x-master-access-token': invalidMasterAccessToken}
  const incompleteHeaders = {}
  const createCostumerEndPoint = '/api/v1/master/consumer/register'

  it("Should create a new valid consumer", async ()=>{
    const payload = {
      name: 'myApp1',
      email: 'mayApp1@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const response = await request(app)
      .post(createCostumerEndPoint)
      .set(validHeaders)
      .send(payload)

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({consumerId: expect.anything(), accessKey: expect.anything() })
  })

  it("Should not create a consumer with no master-access-token", async ()=>{
    const payload = {
      name: 'myApp2',
      email: 'mayApp2@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const response = await request(app)
    .post(createCostumerEndPoint)
    .set(incompleteHeaders)
    .send(payload)

    expect(response.statusCode).toBe(401)
    expect(response.body).toMatchObject({errors: expect.anything()})
  })

  it("Should not create a consumer with invalid master-access-token", async ()=>{
    const payload = {
      name: 'myApp3',
      email: 'mayApp3@mayapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const response = await request(app)
    .post(createCostumerEndPoint)
    .set(invalidHeaders)
    .send(payload)

    expect(response.statusCode).toBe(401)
    expect(response.body).toMatchObject({errors: expect.anything()})
  })

  it("Should not create a consumer with invalid email", async()=>{
    const payload = {
      name: 'myApp4',
      email: 'mayApp4.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const response = await request(app)
    .post(createCostumerEndPoint)
    .set(validHeaders)
    .send(payload)

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({errors: expect.anything()})
  })

  it("Should not create a consumer with no origin declared", async()=>{
    const payload = {
      name: 'myApp5',
      email: 'mayApp5@myapp.com',
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const response = await request(app)
    .post(createCostumerEndPoint)
    .set(validHeaders)
    .send(payload)

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({errors: expect.anything()})
  })

  it("Should not create a consumer with no name declared", async()=>{
    const payload = {
      email: 'mayApp6@myapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const response = await request(app)
    .post(createCostumerEndPoint)
    .set(validHeaders)
    .send(payload)

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({errors: expect.anything()})
  })

  it("Should not create a consumer with no email declared", async()=>{
    const payload = {
      name: 'myApp7',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const response = await request(app)
    .post(createCostumerEndPoint)
    .set(validHeaders)
    .send(payload)

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({errors: expect.anything()})
  })

  it("Should not create a consumer with blank name", async()=>{
    const payload = {
      name: ' ',
      email: 'mayApp8@myapp.com',
      origin: ['myapp.com', '*'],
      userMaxNumber: 0,
      groupMaxNumber: 0
    }

    const response = await request(app)
    .post(createCostumerEndPoint)
    .set(validHeaders)
    .send(payload)

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({errors: expect.anything()})
  })

  it("Should create tow diferent consumers", async()=>{
    const payload1 = {
      name: 'myApp9',
      email: 'myapp9@myapp.com',
      origin: ['*'],
    }

    const payload2 = {
      name: 'MyApp10',
      email: 'myapp10@myapp.com',
      origin: ['*']
    }

    const response1 = await request(app)
      .post(createCostumerEndPoint)
      .set(validHeaders)
      .send(payload1)

    const response2 = await request(app)
    .post(createCostumerEndPoint)
    .set(validHeaders)
    .send(payload2)

    expect(response1.statusCode).toBe(200)
    expect(response2.statusCode).toBe(200)
    expect(typeof response1.body?.consumerId).toBe('string')
    expect(typeof response2.body?.consumerId).toBe('string')
    expect(response1.body?.consumerId).not.toBe(response2.body?.consumerId)
  })

  it("Should not create tow consumers with same email", async ()=>{
    const payload1 = {
      name: 'myApp12',
      email: 'myapp12@myapp.com',
      origin: ['*'],
    }

    const payload2 = {
      name: 'MyApp11',
      email: 'myapp12@myapp.com',
      origin: ['*']
    }

    const response1 = await request(app)
      .post(createCostumerEndPoint)
      .set(validHeaders)
      .send(payload1)

    const response2 = await request(app)
      .post(createCostumerEndPoint)
      .set(validHeaders)
      .send(payload2)
    
    expect(response1.statusCode).toBe(200)
    expect(typeof response1.body?.consumerId).toBe('string')
    expect(response2.statusCode).toBe(406)

  })
})