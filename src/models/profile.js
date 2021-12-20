const mongoose = require('mongoose')
const App = require('./app')
const ProfileTypes = require('./profileTypes')

const schema = new mongoose.Schema({
    name: {type: String, require: true},
    app: {type: mongoose.Types.ObjectId, required: false, ref: App},
    description: {type: String, default: ''},
    type: {type: String, required: true, default: ProfileTypes.standart},
    meta: [{
        key: {type: String, required: true},
        value: {type: mongoose.SchemaTypes.Mixed, default: ""}
    }],

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

schema.index({name: 1, app: 1}, {unique: true})

module.exports = mongoose.model('Profile', schema)