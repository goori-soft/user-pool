const db = require('./db')
const request = require('supertest')
const OLD_ENV = process.env
const masterPassword = 'bananas'
var req = null

beforeAll(async ()=>{
    await db.connect()
    process.env = {...OLD_ENV}
    process.env.MASTER_PASSWORD = masterPassword
    const {app} = require('../src/v1/app')
    req = request(app)
})

afterEach(async ()=>{
    await db.clear()
})

afterAll(async ()=>{
    await db.close()
    process.env = OLD_ENV
})

const masterAuthenticate = async ()=>{
    // Master auth
    // Oly Master User can create a new App
    const resAuth = await req.post('/api/v1/master/auth')
        .send({password: masterPassword})

    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body?.token).toEqual(expect.any(String))

    const masterToken = resAuth.body.token
    return masterToken
}

const createApp = async (appInfo, masterToken)=>{
    const res = await req.post('/api/v1/app/create')
        .set('x-master-access-token', masterToken)
        .send(appInfo)

    expect(res.statusCode).toEqual(200)
    expect(res.body?.app).not.toEqual(undefined)
    
    const appRes = res.body.app
    return appRes
}

describe('App register routes', ()=>{

    it('Should not allow app auth', async ()=>{
        const masterToken = await masterAuthenticate()
        const res = await req.post('/api/v1/app/auth')
            .set('x-master-access-token', masterToken)
            .send({id: 'asdf-asdas-asdasd', key: 'asdasd-asdasd-asd'})

        expect(res.statusCode).toEqual(403)
        expect(res.body?.token).toEqual(undefined)
    })

    it('Should create a new App', async ()=>{ 
        const masterToken = await masterAuthenticate()

        const appInfo = {
            name: 'My App',
            password: 'YouShallNotPass',
            email: 'myapp@gmail.com'
        }

        const appRes = await createApp(appInfo, masterToken)

        expect(appRes.name).toEqual(appInfo.name)
        expect(appRes.email).toEqual(appInfo.email)
        expect(appRes.id).toEqual(expect.any(String))
        expect(appRes.key).toEqual(expect.any(String))
    })

    it('Should create and authenticate a new App', async ()=>{
        const masterToken = await masterAuthenticate()

        const appInfo = {
            name: 'My new App',
            password: 'YouShallNotPass',
            email: 'mynewapp@gmail.com'
        }        
        
        const appRes = await createApp(appInfo, masterToken)
        
        const resAppAuth = await req.post('/api/v1/app/auth')
            .send({id: appRes.id, key: appRes.key})

        expect(resAppAuth.statusCode).toEqual(200)
        expect(resAppAuth.body?.status).toBe('ok')
        expect(resAppAuth.body?.token).toEqual(expect.any(String))

        //'x-app-access-token'
        const userInfo = {
            login: 'newuser',
            email: 'newuser@gmail.com',
            password: 'newUserPass99'
        }

        const resCreateUser = await req.post('/api/v1/user/create')
            .set('x-app-access-token', resAppAuth.body.token)
            .send(userInfo)

        expect(resCreateUser.statusCode).toEqual(200)
        expect(resCreateUser.body?.user).not.toEqual(undefined)
    })

    it('Should not allow tows apps with same email', async ()=>{
        const masterToken = await masterAuthenticate()

        const appInfo = {
            name: 'My App',
            password: 'YouShallNotPass',
            email: 'mynewapp@gmail.com'
        }        
        
        const appRes = await createApp(appInfo, masterToken)

        // shoul not allow
        const newAppInfo = {
            name: 'My new App',
            password: 'YouShallNotPass',
            email: 'mynewapp@gmail.com'
        }

        const res = await req.post('/api/v1/app/create')
            .set('x-master-access-token', masterToken)
            .send(newAppInfo)

        expect(res.statusCode).toEqual(400)
        expect(res.body?.app).toEqual(undefined)
    })    
})