const validateAppToken = require('../controllers/validateAppToken')
const appTokenHeaderName = require('../controllers/getAppTokenHeaderName')

module.exports = (req, res, next)=>{
    const token = req.headers[appTokenHeaderName] || null
    validateAppToken(token, (error, payload)=>{
        if(!error){
            req.app = payload
            next()
        }
        else{
            const response = {
                status: 'fail',
                errors: [error.message],
            }

            res.status(500)
            res.send(response)
        }
    })
}