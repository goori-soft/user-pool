const updateUserMeta = require('../controllers/updateUserMeta')
module.exports = async (req, res)=>{
    const login = req.params.login

    let payload = req.body
    if(!Array.isArray(payload)) payload = [payload]

    const payloadResult = []
    const errors = [] 
    for (meta of payload){
        const key = meta.key
        const value = meta.value
        
        const metaResult = await updateUserMeta(login, key, value)
        if(!metaResult){
            errors.push(`Unable to save key '${meta.key}'`)
        }
        else{
            payloadResult.push(metaResult)
        }
    }

    
    if(payload.length == payloadResult.length){
        const response = {
            status: 'ok',
            message: 'Meta data updated',
            meta: payloadResult
        }
        res.status(200)
        res.send(response)
    }
    else if(payloadResult.length > 0){
        const response = {
            status: 'ok',
            message: 'Meta data updated',
            errors,
            meta: payloadResult,
        }
        res.status(200)
        res.send(response)
    }
    else{
        const response = {
            status: 'fail',
            errors
        }

        res.status(500)
        res.send(response)
    }
}