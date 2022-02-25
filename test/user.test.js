const db = require('./db')
const request = require('supertest')
const OLD_ENV = process.env 

const resources = {
    masterPassword: 'bananas',
    req: null,
    masterToken: null,
    appToken: null,
    appInfo: {
        name: 'My App',
        email: 'myapp@gmail.com',
        password: 'MySafePass99',
    }
}

const masterAuth = async ()=>{
    const {req, appInfo, masterPassword} = resources
    const res = await req.post('/api/v1/master/auth')
        .send({password: masterPassword})

    expect(res.statusCode).toEqual(200)
    expect(res.body?.token).toEqual(expect.any(String))

    resources.masterToken = res.body?.token
}

const createApp = async ()=>{
    const {req, appInfo, masterToken} = resources
    const res = await req.post('/api/v1/app/create')
        .set('x-master-access-token', masterToken)
        .send(appInfo)
    
    expect(res.statusCode).toEqual(200)
    expect(res.body?.app).not.toEqual(undefined)
    expect(res.body?.app?.id).toEqual(expect.any(String))
    expect(res.body?.app?.key).toEqual(expect.any(String))

    resources.appInfo.id = res.body.app.id
    resources.appInfo.key = res.body.app.key
}

const appAuth = async ()=>{
    const {req, appInfo} = resources
    const res = await req.post('/api/v1/app/auth')
        .send({id: appInfo.id, key: appInfo.key})
    
    expect(res.statusCode).toEqual(200)
    expect(res.body?.token).toEqual(expect.any(String))
    
    resources.appToken = res.body.token
}

beforeAll(async ()=>{
    const {masterPassword} = resources

    // connecting memory database
    await db.connect()
    
    // config env
    process.env = {...OLD_ENV}
    process.env.MASTER_PASSWORD = masterPassword
    const {app} = require('../src/v1/app')
    resources.req = request(app)
    
    // creating and auth app client
    await masterAuth()
    await createApp()
    await appAuth()

})

afterAll(async ()=>{
    await db.close()
    process.env = OLD_ENV
})

describe('User CRUD test', ()=>{
    it('Shoul create a new user', async ()=>{
        const {req, appToken} = resources
        
        const userInfo = {
            name: 'John Doe',
            login: 'john99',
            email: 'john99@domain.com',
            password: 'john99Doe',
        }

        const res = await req.post('/api/v1/user/create')
            .set('x-app-access-token', appToken)
            .send(userInfo)

        expect(res.statusCode).toEqual(200)
        expect(res.body?.user).not.toEqual(undefined)
        expect(res.body?.user?.login).toEqual(expect.any(String))
        expect(res.body?.user?.id).toEqual(expect.any(String))
    })
})