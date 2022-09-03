import request from 'supertest'
import app from '@/server/app'
import { validMasterAccessToken, invalidMasterAccessToken } from '../../mocks/masterAccessToken'

describe("Master list consumers: GET /api/v1/master/consumers", ()=>{
    const authEndPoint = '/api/v1/master/consumers'
    const validHeaders = {'x-master-access-token': validMasterAccessToken}
    const invalidHeaders = {'x-master-access-token': invalidMasterAccessToken}
    it("Should list all registered consumers", async ()=>{
        const expectedResponseStructure = {
            total: expect.any(Number),
            active: expect.any(Number),
            inactive: expect.any(Number),
            consumers: expect.any(Array)
        }

        const response = await request(app)
            .get(authEndPoint)
            .set(validHeaders)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toMatchObject(expectedResponseStructure)
    })
})