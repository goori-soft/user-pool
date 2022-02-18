const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    key: {type: String, required: true, unique: true},
    value: {type: String},
})

module.exports = mongoose.model('Configuration', schema)