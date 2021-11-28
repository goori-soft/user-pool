const debug = require('./debug')
module.exports = (err, req, res, next)=>{
    debug.error(err)

    const response = {
        status: 'fail',
        errors: ['Internal error. Something went wrong!']
    }

    res.status(500)
    res.send(response)
}