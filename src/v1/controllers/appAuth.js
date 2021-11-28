const jwt = require('jsonwebtoken')
const App = require('../../models/app')
const encodePassword = require('./encodePassword')
const getAppSecret = require('./getAppSecret')
const debug = require('../../debug')

module.exports = async (id, key, callback=null)=>{
    let token = null
    let error = null

    const criteria = {id}
    try{
        const app = await App.findOne(criteria)
        const encondedKey = encodePassword(key)

        if(app){
            if(app.key === encondedKey){
                const secret = getAppSecret(id)

                const payload = {
                    name: app.name,
                    id: app.id,
                    activated: app.activated
                }
                
                token = jwt.sign(payload, secret)
            }
            else{
                error = new Error(`App key is not correct`)
            }
        }
        else{
            error = new Error(`App Id not founded`)
        }
    }
    catch(e){
        debug.error(e)
        error = new Error(`App Id not founded`)
    }

    if(typeof(callback) == 'function') callback(error, token)

    return token
}