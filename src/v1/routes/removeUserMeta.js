const removeUserMeta = require('../controllers/removeUserMeta')

module.exports = (req, res)=>{
    const login = req.params.login
    const key = req.params.key

    removeUserMeta(login, key, (error, result)=>{
        if(!error){
            const response = {
                status: 'ok',
                message: `Key ${key} has been removed`
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