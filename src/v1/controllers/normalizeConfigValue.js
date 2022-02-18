module.exports = (value)=>{
    if(value == null || value == undefined) value = ""
    if(typeof(value) == 'object' || Array.isArray(value)) value = JSON.stringify(value)
    if(value === true) value = 'true'
    if(value === false) value = 'false'
    if(typeof(value) == 'number') value = value.toString()
    
    // TODO: verify if value is date object

    return value
}