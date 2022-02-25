const getConfig = require('../controllers/getConfig')

module.exports = (req, res)=>{
    const key = req.params.key
    if(!key){
        const message = 'No key has been defined'
        res.status(400).send({
            status: 'fail',
            message,
            errors: [new Error(message)]
        })
    }
    else{
        getConfig(key, '', (error, payload)=>{
            if(error){
                res.status(500).send({
                    status: 'fail',
                    message: error.message,
                    errors: [error]
                })
            }
            else{
                res.status(200).send({
                    status: 'ok',
                    payload
                })
            }
        })
    }
}