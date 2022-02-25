const generateRandomSecret = require('./generateRandomSecret')
const masterPrivateKey = process.env.MASTER_PRIVATE_KEY || generateRandomSecret()

module.exports = masterPrivateKey