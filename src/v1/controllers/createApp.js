const App = require('../../models/app')
const debug = require('../../debug')
const validateEmail = require('./validateEmail')
const validateAppName = require('./validateAppName')
const evaluatePassword = require('./evaluatePassword')
const encodePassword = require('./encodePassword')
const generateRandomSecret = require('./generateRandomSecret')
const {duplicateEmailError} = require('../errors/errors')

module.exports = async (name, email, password, callback=null)=>{
    let error = null
    let app = null

    if(!validateAppName(name)) error = new Error(`Application name does not match service criteria`)
    if(!validateEmail(email)) error = new Error(`Email is not valid`)

    const passEvaluation = evaluatePassword(password)
    if (!passEvaluation.success){
        debug.dev(passEvaluation.errors)
        error = new Error(passEvaluation.errors.join('. '))
    }

    if(!error){
        const id = `${name.split(' ').join('')}-${Math.random().toString(16).slice(2)}`.toUpperCase()
        const key = generateRandomSecret()

        const encondedKey = encodePassword(key)
        const encodedPassword = encodePassword(password)

        const appData = {
            name,
            id,
            key: encondedKey,
            email,
            password: encodedPassword,
        }

        try{
            const success = await App.create(appData)
            app = {
                name,
                email,
                id,
                key,
                passEvaluation 
            }
        }
        catch(e){
            error = new Error(`Unable to create app in the database`)
            // verificar se a chave já está sendo utilizada
            const duplicated = await App.findOne({email: email})
            if (duplicated) error = duplicateEmailError
        }
    }

    if(typeof(callback) == 'function') callback(error, app)

    return app
}