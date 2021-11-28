const appNameMaxSize = process.env.APP_NAME_MAX_SIZE || 150

module.exports = (name)=>{
    if(!name || typeof(name) != 'string' || name.length > appNameMaxSize) return false
    return true
}