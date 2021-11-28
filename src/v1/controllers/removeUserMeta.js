const User = require('../../models/user')
const debug = require('../../debug')

module.exports = async (login, key, callback=none)=>{
    let payload = false
    let error = null

    if(key && typeof(key) == 'string'){
        try{
            const user = await User.findOne({login})
            if(user){
                if(user.meta){
                    user.meta = user.meta.filter(meta => meta.key != key)
                    await user.save()
                }
            }
            else{
                error = new Error(`User ${login} not found`)
            }
        }
        catch(e){
            debug.error(e)
            error = new Error(`Unable to remove '${key}' from user meta data. An error has occured'`)
        }
    }
    else{
        error = new Error(`Key is not defined`)
    }

    if(!error) payload = true
    if(typeof(callback) == 'function') callback(error, payload)
    
    return payload
}