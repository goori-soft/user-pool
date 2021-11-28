const masterAuth = require('../controllers/masterAuth')

module.exports = (req, res)=>{
    const password = req.body.password
    const response = {}

    masterAuth(password, (error, token)=>{
        if(!error){
            res.status(200)
            response.token = token
            response.status = 'ok'
        }
        else{
            res.status(403)
            response.status = 'fail'
            response.error = [error.message]
        }

        return res.send(response)
    })
}