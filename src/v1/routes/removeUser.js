const removeUser = require('../controllers/removeUser')

module.exports = (req, res)=>{
    const appId = req.app ? req.app.id : null
    const login = req.params.login

    // Never send paylad, once it has password information
    removeUser(login, {appId}, (error, payload)=>{
        if(!error){
            const response = {
                status: 'ok',
                message: 'User deleted'
            }

            res.status(200)
            res.send(response)
        }
        else{
            const response = {
                status: 'fail',
                errors: [error.message]
            }

            res.status(401)
            res.send(response)
        }
    })
}