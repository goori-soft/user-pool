const getUser = require('./getUser')

module.exports = async (login, key, callback = null)=>{
    const user = await getUser(login)
    let value = null
    let error = null

    if(user){
        const metaItem = user.meta.find(metaItem => metaItem.key == key)
        if(metaItem){
            value = metaItem.value
        }
        else{
            error = new Error(`User has not meta key '${key}'`)
        }
    }
    else{
        error = new Error(`User not found`)
    }

    if(typeof(callback) == 'function') callback(error, value)

    return value
}