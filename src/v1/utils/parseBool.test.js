const parseBool = require('./parseBool')

describe('Convert to Boolean', ()=>{
    it("true    =>  true", ()=>{
        expect(parseBool(true)).toBe(true)
    })

    it("false   =>  false", ()=>{
        expect(parseBool(false)).toBe(false)
    })

    it("'True'  =>  true", ()=>{
        expect(parseBool('True')).toBe(true)        
    })

    it("'TRUE'  =>  true", ()=>{
        expect(parseBool('TRUE')).toBe(true)
    })

    it("'FALSE' =>  false", ()=>{
        expect(parseBool('FALSE')).toBe(false)
    })

    it("spaces in 'FALSE' =>  false", ()=>{
        expect(parseBool('  FALSE  ')).toBe(false)
    })

    it("'ABSC'  =>  false", ()=>{
        expect(parseBool('  ABSC ')).toBe(false)
    })
})

