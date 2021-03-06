const User = require('../../models/user')
const debug = require('../../debug')
const normalizeUser = require('./normalizeUser')

module.exports = async (login, callback=null)=>{
    let error = null
    let payload = null
    
    try{
        payload = await User.findOne({login}).populate('createdByApp').populate('profiles')
    }
    catch(e){
        debug.error(e)
        error = new Error(`An error has occured in user search`)
    }

    if(payload) payload = await normalizeUser(payload)

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}