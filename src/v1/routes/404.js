module.exports = (req, res)=>{
    const response = {
        status: 'notFounded',
        message: 'API path not founded',
        request: req.originalUrl
    }

    res.status(404)
    res.send(response)
}