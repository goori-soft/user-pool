const normalizeProfile = require('./normalizeProfile')
const normalizeApp = require('./normalizeApp')

module.exports = async (user)=>{
    if(!user) return user
    const app = await normalizeApp(user.createdByApp)
    
    const profiles = []
    if(user.profiles){
        for (index in user.profiles){
            profiles.push(await normalizeProfile(user.profiles[index]))
        }
    }

    user = user.toObject()
    user.profiles = profiles
    user.createdByApp = app
    
    const removeFromUser =['__v', '_id', 'password', 'passwordHistory']
    removeFromUser.map(prop => delete user[prop])
    if(user.meta) user.meta.map(item=> delete item._id)

    return user
}