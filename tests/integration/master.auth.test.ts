import request from 'supertest'
import app from '@/server/app'

describe("Master POST endpoints", ()=>{
    const authEndPoint = '/api/v1/master/auth'

    it("Should authenticate master user", async ()=>{    
        const authPayload = {
            masterAccessKey: process.env.MASTER_ACCESS_KEY
        }

        const response = await request(app)
            .post(authEndPoint)
            .send(authPayload)

        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('message')
    })

    it("Should not authenticate master user", async ()=>{
        const authPayload = {
            masterAccessKey: ''
        }

        const response = await request(app)
            .post(authEndPoint)
            .send(authPayload)

        expect(response.statusCode).toEqual(401)
        expect(response.body).toHaveProperty('errors')
        expect(response.body).toHaveProperty('message')
    })
})