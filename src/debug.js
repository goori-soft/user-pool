const props = require('./props')
const debug = require('debug')
const log = debug(props.name)
const error = debug(`[ERROR]:${props.name}`)
const warn = debug(`[WARNING]:${props.name}`)
const dev = debug(`dev`)
module.exports = {
    log,
    error,
    warn,
    dev,
}