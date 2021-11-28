const User = require('../../models/user')
const debug = require('../../debug')

module.exports = async (login, key, value, callback = null)=>{
    let error = null
    let payload = null
    let defaultErrorMessage = `Could not update user meta data.`

    if(key && typeof(key) == 'string'){
        try{
            const user = await User.findOne({login})
            if (user){
                metaItem = user.meta.find(meta => meta.key == key)
                if(metaItem){
                    metaItem.value = value
                }
                else{
                    user.meta.push({key, value})
                }

                try{
                    await user.save()
                    payload = {key, value}
                }
                catch(e){
                    debug.error(e)
                    error = new Error(`${defaultErrorMessage} Unable to save user meta in database`)
                }
            }
            else{
                error = new Error(`${defaultErrorMessage} User not finded`)
            }
        }
        catch(e){
            debug.error(e)
            error = new Error(`${defaultErrorMessage} There was an error in database connection`)
        }
    }
    else{
        error = new Error(`${defaultErrorMessage} Key must be a string`)
    }

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}