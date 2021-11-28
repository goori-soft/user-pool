const crypto = require('crypto')

module.exports = (password)=>{
    if(password && typeof(password) == 'string'){
        return crypto.createHash('md5').update(password).digest('hex')
    }
    
    return ''
}