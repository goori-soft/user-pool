const createUser = require('../controllers/createUser')
const getAppIdFromRequest = require('../utils/getAppIdFromRequest')

module.exports = async (req, res)=>{

    const login = req.body.login
    const password = req.body.password
    const email = req.body.email
    const meta = req.body.meta
    const appId = getAppIdFromRequest(req)

    createUser(login, password, {email, meta, appId}, (error, payload)=>{
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