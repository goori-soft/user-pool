const mongoose = require('mongoose')
const Profile = require('./profile')
const App = require('./app')

const schema = new mongoose.Schema({
    name: {type: String},
    login: {type: String, required: true, unique: true},
    email: {type: String},
    password: {type: String},
    passwordHistory: [{
        password: {type: String, required: true},
        changedAt: {type: Date, required: true}
    }],

    profiles: [{type: mongoose.Types.ObjectId, ref: 'Profile'}],
    activated: {type: Boolean, default: true},

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deletedAt: {type: Date, default: Date.now},

    createdByApp: {type: mongoose.Types.ObjectId, required: false, ref: App},

    meta: [{
        key: {type: String, required: true},
        value: {type: mongoose.SchemaTypes.Mixed, default: ""}
    }]
})

module.exports = mongoose.model('User', schema)