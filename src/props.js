const props = require('../package.json')

let name = props.name
let version = props.version

if(name.indexOf('/')) name = name.split('/')[1]

module.exports = {
    name,
    version
}