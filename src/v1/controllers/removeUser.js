const User = require('../../models/user')
const debug = require('../../debug')
const parseBool = require('../utils/parseBool')
const getUser = require('./getUser')
const checkOwnerBeforeRemove = parseBool(process.env.CHECK_OWNER_BEFORE_REMOVE, true)

/**
 * Remove a user. The method behavior depends of envirorment variables
 * @param {String} id 
 * @param {Object} options 
 */
module.exports = async (login, options = {}, callback = null)=>{
    let error = null
    let payload = null
    
    if(typeof(options) == 'function') {
        callback = options
        options = {}
    }

    const appId = options.appId
    
    if(!login){
        error = new Error(`Could not remove user. Login is not defined`)     
    }
    else{
        payload = await getUser(login)
        if(payload){
            if(checkOwnerBeforeRemove && appId != payload.createdByApp.id){
                error = new Error(`Can not remove user. User '${login}' does not belong to this app`)
            }
            else{
                try{
                    await User.remove({login})
                }
                catch(e){
                    error = e
                }
            }
        }
    }

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}