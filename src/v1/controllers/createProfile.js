const Profile = require('../../models/profile')
const ProfileTypes = require('../../models/profileTypes')
const getAppById = require('./getAppById')
const debug = require('../../debug')

const defaultOptions = {type: ProfileTypes.standart, description: ''}

module.exports = async (name, appId, options={...defaultOptions}, callback=null)=>{
    let payload = null
    let error = null

    if (typeof(options) == 'function' && !callback){
        callback = options
        options = {type: ProfileTypes.standart}
    }

    options = {...defaultOptions, ...options}

    const app = await getAppById(appId)

    if(app){
        const profile = {name, app: app._id, description: options.description}
        try{
            const profilePayload = await Profile.create(profile)
            payload = {
                name: profilePayload.name,
                appId: app.id,
                type: options.type
            }
        }
        catch(e){
            debug.error(e)
            error = new Error(`Unable to create profile`)
        }
    }
    else{
        error = new Error(`App not found`)
    }

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}