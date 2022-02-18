module.exports = (key)=>{
    if(typeof(key) != 'string') return null
    const normKey = key.trim().split(' ').join('_').toUpperCase()
    return normKey
}