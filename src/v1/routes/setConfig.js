const setConfig = require('../controllers/setConfig')

module.exports = (req, res)=>{
    const key = req.body.key
    const value = req.body.value

    setConfig(key, value, (error, payload)=>{
        if(!error){
            const response = {
                status: 'ok',
                message: 'Config value was saved',
                payload
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