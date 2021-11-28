const parseBool = require('../utils/parseBool')
const generateRandomSecret = require('./generateRandomSecret')
const appSecrets = require('./appSecrets')

const appAuthUseRandomSecret = parseBool(process.env.APP_AUTH_USE_RANDOM_SECRET, true)
const appAuthSecret = process.env.APP_AUTH_SECRET || false

const getRandomSecret = (id)=>{
    if(appSecrets[id]) return appSecrets[id]

    const secret = generateRandomSecret()
    appSecrets[id] = secret

    return secret
}

const getDefinedSecret = ()=>{
    return appAuthSecret
}

module.exports = (id)=>{
    if(appAuthUseRandomSecret || !appAuthSecret) return getRandomSecret(id)
    return getDefinedSecret()
}