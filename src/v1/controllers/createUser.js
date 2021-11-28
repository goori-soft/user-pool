const parseBool = require('../utils/parseBool')
const debug = require('../../debug')
const User = require('../../models/user')
const getAppById = require('./getAppById')
const encondePassword = require('./encodePassword')
const evaluatePassword = require('./evaluatePassword')
const useEmailAsLogin = parseBool(process.env.USE_EMAIL_AS_LOGIN, false)
const validateEmail = require('./validateEmail')

module.exports = async (login, password, options = {}, callback=null)=>{
    let errors = []
    let error = null
    let payload = null
    options = {...options}

    const evaluation = evaluatePassword(password)

    if(useEmailAsLogin) options.email = login
    if(options.email && !validateEmail(options.email)) errors.push(`Email is not required, but must be valid`)
    if(useEmailAsLogin && !validateEmail(options.email)) errors.push(`Login must be a valid email`)
    if(!evaluation.success) errors = errors.concat(evaluation.errors)

    if(errors.length <= 0){
        const encondedPassword = encondePassword(password)
        const meta = []
        const email = options.email || undefined
        let createdByApp = null

        const app = await getAppById(options.appId)
        if(app) createdByApp = app._id

        const user = {
            login,
            password: encondedPassword,
            email,
            meta,
            createdByApp,
        }

        try{
            const userPayload = await User.create(user)
            payload = {
                id: userPayload._id,
                login,
                activated: userPayload.activated,
                meta,
                profiles: userPayload.profiles
            }
        }
        catch(e){
            const user = await User.findOne({login})
            if(user){
                error = new Error(`User could not be created. Login '${login}' is already in use`)
            }
            else{
                debug.error(e)
                error = new Error(`Internal error. User could not be created`)
            }
        }

    }
    else{
        error = new Error(`User could not be created. ${errors.join(', ')}`)
    }

    if (typeof(callback) == 'function') callback(error, payload)

}