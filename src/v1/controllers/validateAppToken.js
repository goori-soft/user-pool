const jwt = require('jsonwebtoken')
const debug = require('../../debug')
const getAppSecret = require('./getAppSecret')

module.exports = (token, callback=null)=>{
    let error = null
    let payload = null

    if(token){
        try{
            payload = jwt.decode(token)
            const id = payload.id
            const secret = getAppSecret(id)
            try{
                const validate = jwt.verify(token, secret)
                error = null
            }
            catch(e){
                debug.error(e)
                error = new Error(`Token is not valid.`)
            }
        }
        catch(e){
            debug.error(e)
            error = new Error(`It's not possible to decode the given token`)
        }
    }
    else{
        error = new Error(`Token is not a valid token string`)
    }

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}