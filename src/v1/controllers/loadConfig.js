const config = require('./config')
const Configuration = require('../../models/configurantion')
const normalizeConfigKey = require('./normalizeConfigKey')
const normalizeConfigValue = require('./normalizeConfigValue')
const notSettableConfigVars = require('./notSettableConfigVars')

module.exports = async (callback = null)=>{
    let error = null
    let payload = null

    try{
        const configurations = await Configuration.find()
        configurations.map( item => {
            if (!notSettableConfigVars.includes(item)) config[item.key] = normalizeConfigValue(item.value)
        })
        payload = {...config}
    }
    catch(e){
        error = e
    }
    
    if(typeof(callback) == 'function' ) callback(error, payload)

    return payload
}