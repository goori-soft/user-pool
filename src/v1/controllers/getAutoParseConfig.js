const getConfig = require('./getConfig')

const autoParse = (value)=>{
    if(typeof(value) == 'string'){
        const delimiters = `${value.substr(0, 1)}${value.substr(value.length - 1 , 1)}`
        if( delimiters === '{}' || delimiters === '[]'){
            try{
                const o = JSON.parse(value)
                value = o
            }
            catch(e){
                // nothing to do
            }
        }
        else{
            if(value === 'true') value = true
            if(value === 'false') value = false
            if(!isNaN(value)) value = value * 1
        }
    }

    return value
}

module.exports = (key, defaultValue, callback = null)=>{
    let error = null
    let payload = defaultValue

    try{
        payload = getConfig(key, defaultValue)
    }
    catch(e){
        error = e
    }

    payload = autoParse(payload)

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}