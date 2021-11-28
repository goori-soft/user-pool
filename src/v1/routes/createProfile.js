const getAppIdFromRequest = require('../utils/getAppIdFromRequest')
const createProfile = require('../controllers/createProfile')
const debug = require('../../debug')

module.exports = (req, res)=>{
    let name = req.body.name
    let description = req.body.description || ''

    const appId = getAppIdFromRequest(req)

    createProfile(name, appId, {description}, (error, payload)=>{
        if(!error){
            const response = {
                status: 'ok',
                message: 'Profile created with success'
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