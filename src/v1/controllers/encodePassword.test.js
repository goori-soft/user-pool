const encodePassword = require('./encodePassword')

it('Password encoder', ()=>{
    const pass = encodePassword('123')
    const nullPass = encodePassword(null)
    const emptyPass = encodePassword('')

    expect(typeof pass).toBe('string')
    expect(pass).not.toBe('')
    expect(typeof nullPass).toBe('string')
    expect(nullPass).toBe('')
    expect(typeof emptyPass).toBe('string')
    expect(emptyPass).toBe('')
})