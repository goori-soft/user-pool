const attachProfile = require('../controllers/attachProfile')
const getAppIdFromRequest = require('../utils/getAppIdFromRequest')

module.exports = (req, res)=>{
    const login = req.body.login
    const profileName = req.body.profile
    const appId = getAppIdFromRequest(req)

    attachProfile(login, appId, profileName, (error, payload)=>{
        if(!error){
            const response = {
                status: 'ok',
                message: `Profile '${profileName}' attached to user ${login}`,
                payload
            }  
            res.status(200)
            res.send(response)
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