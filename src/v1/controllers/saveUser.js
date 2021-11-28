const User = require('../../models/user')
const debug = require('../../debug')

module.exports = async (userPayload, callback= null)=>{
    error = null
    payload = null

    if(userPayload.login){
        const userData = {...userPayload}
        delete userData.createdByApp
        try{
            payload = await User.findOneAndUpdate({login: userPayload.login}, userData, {new: true})
        }
        catch(e){
            debug.error(e)
            error = new Error(`Unable to update user '${userPayload.login}'`)
        }
    }
    else{
        error = new Error(`Unable to update user. Login is not defined`)
    }

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}