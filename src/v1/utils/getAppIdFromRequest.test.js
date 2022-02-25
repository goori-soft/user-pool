const getAppIdFromRequest = require('./getAppIdFromRequest')

describe('Get App Id from Request Object', ()=>{
    it('app: {id: 1} => 1', ()=>{
        const req = {app: {id: 1}}
        expect(getAppIdFromRequest(req)).toBe(1)
    })

    it('app: {xid: 1} => undefined', ()=>{
        const req = {app: {xid: 1}}
        expect(getAppIdFromRequest(req)).toBe(undefined)
    })

    it('undefined => undefined', ()=>{
        expect(getAppIdFromRequest(undefined)).toBe(undefined)
    })
})