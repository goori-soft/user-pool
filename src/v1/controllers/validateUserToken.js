const jwt = require('jsonwebtoken')
const debug = require('../../debug')
const getUserSecret = require('./getUserSecret')

module.exports = (token, callback=null)=>{
    let payload = null
    let error = null

    if(token){
        try{
            payload = jwt.decode(token)
            if(payload){
                const login = payload.login
                const secret = getUserSecret(login)
                try{
                    const validate = jwt.verify(token, secret)
                    error = null
                }
                catch(e){
                    debug.error(e)
                    error = new Error(`Token is not valid.`)
                }
            }
            else{
                error = new Error(`Token has no valid payload`)
            }
        }
        catch(e){
            debug.error(e)
            error = new Error(`It's not possible to decode the given token`)
        }
    }
    else{
        error = new Error(`Token is not defined`)
    }

    if(typeof(callback) == 'function') callback(error, payload)
    return payload
}