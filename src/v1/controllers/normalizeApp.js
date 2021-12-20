module.exports = async (app)=>{
    if(!app || typeof(app) != 'object') return app

    if(app.toObject) app = app.toObject()

    const removeFromApp = ['__v', '_id', 'id', 'key', 'password']
    removeFromApp.map( prop => delete app[prop])
    return app
}