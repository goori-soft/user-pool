// Carregando variáveis de ambiente
require('dotenv').config()

const port = process.env.PORT || 8080

// Carregando console
const debug = require('./src/debug')

// Conexão com a base de dados
require('./src/connection')

// Carregando dependências do projeto
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Configuração do app
const app = express()
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(cors())

// Configuração das rotas
const routerV1 = require('./src/v1/routes')
app.use('/api/v1', routerV1)

const errorHandler = require('./src/errorHandler')
app.use(errorHandler)

app.listen(port, ()=>{
    debug.log(`Server is runing on port ${port}`)
})