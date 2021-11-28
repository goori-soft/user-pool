const getUser = require('./getUser')
const getProfile = require('./getProfile')
const getAppById = require('./getAppById')
const saveUser = require('./saveUser')
const debug = require('../../debug')

module.exports = async (login, appId, profileName, callback=null)=>{
    let error = null
    let payload = null
    if(login){
        let user = await getUser(login)
        if(user){
            const app = await getAppById(appId)
            if(app){
                const profile = await getProfile(profileName, app)
                if(profile){
                    if(!user.profiles.includes(profile._id)){
                        user.profiles.push(profile._id)
                        const r = await saveUser(user)
                        if(r){
                            payload = profileName
                        }
                        else{
                            error = new Error(`Unable to save user. An error has occurred`)
                        }
                    }
                    else{
                        payload = profileName
                    }
                }
                else{
                    error = new Error(`Profile not found`)
                }
            }
            else{
                error = new Error(`App not found`)
            }
        }
        else{
            error = new Error(`User ${login} not found`)
        }
    }
    else{
        error = new Error(`Unable to find user. Login is not defined`)
    }


    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}