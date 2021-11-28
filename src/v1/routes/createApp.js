const createApp = require('../controllers/createApp')

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
            const response = {
                status: 'fail',
                errors: [error.message]
            }
            res.status(500)
            res.send(response)
        }
    })

    
}