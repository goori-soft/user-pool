const config = require('./config')
const notSettableConfigVars = require('./notSettableConfigVars')
const restartableConfigVars = require('./restartableConfigVars')
const Configuration = require('../../models/configurantion')
const restart = require('./restart')
const debug = require('../../debug')

const normalizeValue = require('./normalizeConfigValue')
const normalizeKey = require('./normalizeConfigKey')

module.exports = async (key, value, callback=null)=>{
    let error = null
    let payload = null

    const normValue = normalizeValue(value)
    const normKey = normalizeKey(key)

    if(!normKey || normKey === "" || typeof(normKey) != 'string'){
        error = new Error(`Key of configuration must be a valid string`)
    }
    else if(notSettableConfigVars.includes(normKey)){
        error = new Error(`The '${key}' variable is not settable`)
    }
    else{
        const query = {key: normKey}
        const update = {value: normValue}
        const options = { upsert: true, new: true, setDefaultsOnInsert: true }
        await Configuration.findOneAndUpdate(query, update, options)
        config[normKey] = normValue
        payload = {key: normKey, value: normValue}

        if(restartableConfigVars.includes(normKey)){
            debug.warn(`'${normKey}' is a restartable key config variable. Server must be restarted`)
            restart()
        }
    }

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}