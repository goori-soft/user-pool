const createApp = require('../controllers/createApp')
const {duplicateEmailError} = require('../errors/errors')

module.exports = (req, res)=>{
    const name = req.body.name || ''
    const email = req.body.email
    const password = req.body.password

    createApp(name, email, password, (error, app)=>{
        if(!error){
            const response = {
                status: 'ok',
                message: 'Aplicativo criado com sucesso',
                app
            }
        
            res.status(200)
            res.send(response)
        }
        else{
            let statusCode = 500
            if (error == duplicateEmailError) statusCode = 400
            const response = {
                status: 'fail',
                errors: [error.message]
            }
            res.status(statusCode)
            res.send(response)
        }
    })
}