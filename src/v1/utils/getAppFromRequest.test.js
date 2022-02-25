const getAppFromRequest = require('./getAppFromRequest')

describe('Get App from Request Object', ()=>{
    it('req: {app: {}} => {}', ()=>{
        const req = {app: {}}
        expect(getAppFromRequest(req)).toStrictEqual(expect.any(Object))
    })

    it('req: {} => undefined', ()=>{
        const req = {}
        expect(getAppFromRequest(req)).toBe(undefined)
    })

    it('req: undefined => undefined', ()=>{
        expect(getAppFromRequest(undefined)).toBe(undefined)
    })
})