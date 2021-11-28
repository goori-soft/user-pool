const getUser = require('../controllers/getUser')
module.exports = (req, res)=>{
    const login = req.params.login
    getUser(login, (error, payload)=>{
        if(!error){
            user = {...payload}
            if(user.password) delete user.password

            const response = {
                status: 'ok',
                message: 'User found',
                user,
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