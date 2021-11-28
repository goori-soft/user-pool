const Profile = require('../../models/profile')
const getAppById = require('./getAppById')
const debug = require('../../debug')

module.exports = async (name, app, callback = null)=>{
    let error = null
    let payload = null

    if(typeof(app) == 'object' && !app._id){
        app = await getAppById(app.id)
    }

    if(app){
        try{
            payload = await Profile.findOne({name, app: app._id})
        }
        catch(e){
            debug.error(e)
            error = new Error(`Unable to find profile ${name} in this app`)
        }
    }
    else{
        console.log(app)
        error = new Error(`App not found`)
    }

    if(typeof(callback) == 'function') callback(error, payload)

    return payload
}