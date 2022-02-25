const express = require('express')
const cors = require('cors')
const app = express()
const debug = require('../debug')
const status = require('../status')
const router = require('./routes')
const version = 1
const getConfig = require('./controllers/getAutoParseConfig')
const loadConfig = require('./controllers/loadConfig')
const serverInfo = {
    port: null,
    server: null,
} 

app.use(cors())
app.use(express.urlencoded({limit: '5mb', extended: true}))
app.use(express.json({ limit: '5mb', extended: true }))

app.get('/api/status', (req, res)=>{res.send(status)})
app.get(`/api/v${version}/status`, (req, res)=>{res.send(status)})

// Loading routes
app.use(`/api/v${version}`, router)

const errorHandler = require('../errorHandler')
app.use(errorHandler)

const start = ()=>{
    if(!serverInfo.server){
        loadConfig((e, payload)=>{
            if(e) debug.error(e)
            const port = parseInt(getConfig('PORT', 8080))
        
            // Configuração do app
            
            
        
            const server = app.listen(port, ()=>{
                debug.log(`Server is runing on port ${port}. API version is v${version}`)
            })

            serverInfo.server = server
            serverInfo.port = port
        })
    }
    else{
        debug.error(`It is not possible to start server. Server is already runing at port ${serverInfo.port}. Use close to stop server and try start it again.`)
    }
}

const close = ()=>{
    if(serverInfo.server){
        debug.log(`Closing server at port ${serverInfo.port}`)
        
        serverInfo.server.close(()=>{
            serverInfo.server = null
            serverInfo.port = null
        })
    }
    else{
        debug.warn(`It is not possible to close the server. No server is runing. API version is v${version}`)
    }
}


module.exports = {start, close, app}