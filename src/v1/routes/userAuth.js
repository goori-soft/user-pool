const userAuth = require('../controllers/userAuth')

module.exports = async (req, res)=>{
    const login = req.body.login
    const password = req.body.password

    userAuth(login, password, (error, token)=>{
        if(!error){
            const response = {
                status: 'ok',
                token,
                message: 'User has been authenticated'
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