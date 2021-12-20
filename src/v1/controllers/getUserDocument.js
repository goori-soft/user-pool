const User = require('../../models/user')
const debug = require('../../debug')

module.exports = async (login, callback=null)=>{
    let error = null
    let payload = null
    
    try{
        payload = await User.findOne({login})
    }
    catch(e){
        debug.error(e)
        error = new Error(`An error has occured in user search`)
    }

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}