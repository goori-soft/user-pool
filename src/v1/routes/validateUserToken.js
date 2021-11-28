const validateUserToken = require('../controllers/validateUserToken')
module.exports = (req, res)=>{
    const token = req.body.token

    validateUserToken(token, (error, payload)=>{
        if(!error){
            const response = {
                status: 'ok',
                payload,
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