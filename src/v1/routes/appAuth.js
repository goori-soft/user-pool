const appAuth = require('../controllers/appAuth')

module.exports = (req, res)=>{
    const id = req.body.id
    const key = req.body.key

    appAuth(id, key, (error, token)=>{
        if (!error){
            const response = {
                status: 'ok',
                token
            }

            res.status(200)
            res.send(response)
        }
        else{
            const response = {
                status: 'fail',
                errors: [error.message]
            }
            res.status(403)
            res.send(response)   
        }
    })
}