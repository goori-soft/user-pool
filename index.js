// Loading env
require('dotenv').config()

// Getting database connection
require('./src/connection')

const version = 1
const {start} = require(`./src/v${version}/app`)

// Starting server
start()