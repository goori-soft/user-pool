const jwt = require('jsonwebtoken')
const debug = require('../../debug')

const masterPrivateKey = require('./getMasterPrivateKey')

module.exports = (token, callback = null)=>{
    let decoded = null
    let error = null
    try{
        decoded = jwt.verify(token, masterPrivateKey)
    }
    catch(e){
        debug.error(e)
    }
    
    if(!decoded){
        error = new Error(`Unable to decode token. This may indicate that token is no longer valid`)
    }

    if(typeof(callback) == 'function'){
        callback(error, decoded)
    }

    return decoded
}