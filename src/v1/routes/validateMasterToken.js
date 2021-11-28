const { response } = require('express')
const debug = require('../../debug')
const validateMasterToken = require('../controllers/validateMasterToken')
const masterTokenHeaderName = process.env.MASTER_TOKEN_HEADER_NAME || 'x-master-access-token'

module.exports = (req, res, next)=>{

    const headers = req.headers
    if (headers && headers[masterTokenHeaderName] && headers[masterTokenHeaderName].toString().trim() != ''){
        const token = headers[masterTokenHeaderName]
    
        validateMasterToken(token, (error, payload)=>{
            
            if(!error){
                req.token = token
                req.tokenPayload = payload
                next()
            }
            else{

                const response = {
                    status: 'denied',
                    errors: [error.message]
                }

                res.status(403)
                res.send(response)
            }
        })

    }
    else{
        const msg = `${masterTokenHeaderName} header not founded`
        const response = {
            status: 'unauthenticated',
            errors: [msg]
        }
        res.status(401)
        res.send(response)
    }
}