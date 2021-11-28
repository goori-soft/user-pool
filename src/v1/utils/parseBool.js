module.exports = (value, defaultValue=false)=>{
    if (defaultValue) defaultValue = true

    if (value == 1) return true
    if (value == 0) return false

    if (value === true) return true

    if (value){
        const stringValue = value.toString().toLowerCase().trim()
        if(stringValue == 'true') return true
        if(stringValue == 'false') return false

        return defaultValue
    }
    else if (value === false){
        return false
    }

    return defaultValue
}