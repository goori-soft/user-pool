const db = require('./db')
const request = require('supertest')
const jwt = require('jsonwebtoken')
const OLD_ENV = process.env

beforeAll(async ()=>{
    await db.connect()
})

beforeEach(()=>{
    jest.resetModules()
    process.env = {...OLD_ENV}
})

afterEach(async ()=>{
    await db.clear()
})

afterAll(async ()=>{
    await db.close()
    process.env = OLD_ENV
})

describe('Master Routes', ()=>{
    it('Shoul fail auth', async ()=>{
        // Define ENV Test
        process.env.MASTER_PASSWORD = 'YouShallNotPass'
        const {app} = require('../src/v1/app')
        const master = {
            password: 'bananas'
        }
        
        const res = await request(app)
            .post('/api/v1/master/auth')
            .send(master)
        
        expect(res.statusCode).toEqual(403)
        expect(res.body?.token).toBe(undefined)
        expect(res.body?.status).toBe('fail')
    })

    it('Sould return a valid jwt', async ()=>{
        // Define ENV Test
        process.env.MASTER_PASSWORD = 'bananas'
        const {app} = require('../src/v1/app')
        const master = {
            password: 'bananas'
        }
        
        const res = await request(app)
            .post('/api/v1/master/auth')
            .send(master)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body?.token).toEqual(expect.any(String))
    })

    it('Should block no auth request', async ()=>{
        const {app} = require('../src/v1/app')
        
        const res = await request(app)
            .get('/api/v1/config/port')

        expect(res.statusCode).toEqual(401)
        expect(res.body?.status).toBe('unauthenticated')
    })
    
    it('Should block a fake token', async ()=>{
        payload = {'function': 'master'}
        masterPrivateKey = 'a'
        const token = jwt.sign(payload, masterPrivateKey)
        const {app} = require('../src/v1/app')

        const res = await request(app, {})
            .get('/api/v1/config/port')
            .set('x-master-access-token', token)
            .send()

        expect(res.statusCode).toEqual(403)
        expect(res.body?.status).toBe('denied')
        expect(res.body?.payload).toBe(undefined)
    })

    it('Should authenticate and get the PORT variable', async ()=>{
        const password = 'bananas'
        const port = 3000
        process.env.MASTER_PASSWORD = password
        process.env.PORT = port

        const {app} = require('../src/v1/app')
        const req = request(app)
        const masterAuth = {password}
        const authRes = await req
            .post('/api/v1/master/auth')
            .send(masterAuth)

        expect(authRes.statusCode).toEqual(200)
        expect(authRes.body?.token).toEqual(expect.any(String))

        const token = authRes.body?.token

        const res = await req
            .get('/api/v1/config/port')
            .set('x-master-access-token', token)
            .send()

        expect(res.statusCode).toEqual(200)
        expect(res.body?.payload).toEqual(port)
    })
})