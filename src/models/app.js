const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    key: {type: String, required: true},

    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    activated: {type: Boolean, default: false},

    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('App', schema)