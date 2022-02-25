const jwt = require('jsonwebtoken')
const debug = require('../../debug')
const generateRandonSecret = require('./generateRandomSecret')

const masterPassword = process.env.MASTER_PASSWORD || ''
const masterRequiresAuth = process.env.MASTER_REQUIRES_AUTH || true
const masterPrivateKey = require('./getMasterPrivateKey')

module.exports = (password, callback = null)=>{
    let token = null
    let error = null
    
    if (!masterRequiresAuth || password === masterPassword){
        const payload = { 'function': 'master' }
        token = jwt.sign(payload, masterPrivateKey)
    }
    else if(!password){
        const msg = `Unable to authenticate to master service. Password is not defined`
        error = new Error(msg)
        debug.error(msg)
    }
    else{
        const msg = `Unable to authenticate to master service. Password does not match`
        error = new Error(msg)
        debug.error(msg)
    }

    if(typeof(callback) == 'function'){
        callback(error, token)
    }

    return token
}