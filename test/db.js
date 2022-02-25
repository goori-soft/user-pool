const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const connect = async ()=>{
    const mongodb = await MongoMemoryServer.create()
    const url = await mongodb.getUri()

    const options = {
        useNewUrlParser: true,
    }

    await mongoose.connect(url, options)
}

const close = async ()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
}

const clear = async ()=>{
    const collections = mongoose.connection.collections
    for (let idx in collections){
        const collection = collections[idx]
        await collection.deleteMany()
    }
}

module.exports = {
    connect,
    close,
    clear
}