const App = require('../../models/app')
const normalizeApp = require('./normalizeApp')

module.exports = async (profile)=>{
    if(!profile || typeof(profile) != 'object') return profile
    const removeFromProfile = ['__v', '_id']
    const app = await normalizeApp(await App.findOne({_id: profile.app}))
    profile = profile.toObject()
    profile.app = app
    profile.id = profile._id || profile.id || ''
    removeFromProfile.map( prop => delete profile[prop])
    return profile
}