const User = require('../../models/user')
const encodePassword = require('./encodePassword')
const jwt = require('jsonwebtoken')
const debug = require('../../debug')
const getUserSecret = require('./getUserSecret')
const normalizeUser = require('./normalizeUser')

module.exports = async (login, password, callback=null)=>{
    let error = null
    let token = null

    if(login && typeof(login) == 'string'){
        try{
            let user = await User.findOne({login}).populate('createdByApp').lean()
            if(user){
                encondedPass = encodePassword(password)
                if(user.password == encondedPass){
                    user = normalizeUser(user)
                    const secret = getUserSecret(login)
                    const payload = {
                        login: user.login,
                        meta: user.meta,
                        createdByApp: user.createdByApp
                    }

                    try{
                        token = jwt.sign(payload, secret)
                    }
                    catch(e){
                        debug.error(e)
                        error = new Error(`Unable to generate token. An error has occurred`)
                    }
                }
                else{
                    error = new Error(`User password does not match`)
                }
            }
            else{
                error = new Error(`User not found`)
            }
        }
        catch(e){
            debug.error(e)
            error = new Error(`Unable to find user. An error has occurred`)
        }
    }
    else{
        error = new Error(`Login is not defined`)
    }

    if(typeof(callback) == 'function') callback(error, token)

    return token
}