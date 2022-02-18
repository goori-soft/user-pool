const config = require('./config')
const normalizeConfigKey = require('./normalizeConfigKey')

module.exports = (key, defaultValue = undefined, callback = null)=>{
    let error = null
    let payload = defaultValue

    const normKey = normalizeConfigKey(key)
    if(normKey){
        if(normKey in process.env || normKey in config){
            payload = defaultValue
            if (normKey in process.env) payload = process.env[normKey]
            if (normKey in config) payload = config[normKey]
        }
        else{
            error = new Error(`'${normKey}' is not defined in configuration object, environment or database`)
        }
    }
    else{
        error = new Error(`Key must be a valid string`)
    }

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}