// Carregando variáveis de ambiente
require('dotenv').config()

// Carregando console
const debug = require('./src/debug')

// Conexão com a base de dados
require('./src/connection')

// Carregando dependências do projeto
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const status = require('./src/status')

const getConfig = require('./src/v1/controllers/getAutoParseConfig')
const loadConfig = require('./src/v1/controllers/loadConfig')

loadConfig(()=>{
    const port = parseInt(getConfig('PORT', 8080))

    // Configuração do app
    const app = express()
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
    app.use(bodyParser.json({ limit: '10mb', extended: true }))
    app.use(cors())

    app.get('/api/status', (req, res)=>{res.send(status)})
    app.get('/api/v*/status', (req, res)=>{res.send(status)})

    // Configuração das rotas
    const routerV1 = require('./src/v1/routes')
    app.use('/api/v1', routerV1)

    const errorHandler = require('./src/errorHandler')
    app.use(errorHandler)

    app.listen(port, ()=>{
        debug.log(`Server is runing on port ${port}`)
    })
})