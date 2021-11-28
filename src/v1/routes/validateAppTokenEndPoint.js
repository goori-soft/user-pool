const validateAppToken = require('../controllers/validateAppToken')
const appTokenHeaderName = require('../controllers/getAppTokenHeaderName')

module.exports = (req, res)=>{
    const token = req.headers[appTokenHeaderName] || req.body.token || null

    validateAppToken(token, (error, payload)=>{
        if(!error){
            const response = {
                status: 'ok',
                messate: 'Token is valid',
                payload,
            }

            res.status(200)
            res.send(response)
        }
        else{
            const response = {
                status: 'fail',
                errors: [error.message],
                payload,
            }

            res.status(500)
            res.send(response)
        }
    })
}