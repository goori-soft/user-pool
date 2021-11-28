module.exports = (user)=>{
    if(!user) return user
    const removeFromUser =['__v', '_id', 'password', 'passwordHistory']
    const removeFromApp = ['__v', '_id', 'id', 'key', 'password']

    removeFromUser.map(prop => delete user[prop])
    
    if(user.createdByApp) removeFromApp.map(prop => delete user.createdByApp[prop])
    if(user.meta) user.meta.map(item=> delete item._id)
    return user
}