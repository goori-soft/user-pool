const parseBool = require('../utils/parseBool')
const generateRandomSecret = require('./generateRandomSecret')
const userSecrets = require('./userSecrets')

const userAuthUseRandomSecret = parseBool(process.env.USER_AUTH_USE_RANDOM_SECRET, true)
const userAuthSecret = process.env.USER_AUTH_SECRET || false

const getRandomSecret = (id)=>{
    if(userSecrets[id]) return userSecrets[id]

    const secret = generateRandomSecret()
    userSecrets[id] = secret

    return secret
}

const getDefinedSecret = ()=>{
    return userAuthSecret
}

module.exports = (login)=>{
    if(userAuthUseRandomSecret || !userAuthSecret) return getRandomSecret(login)
    return getDefinedSecret()
}