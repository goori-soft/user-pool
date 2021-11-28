const mongoose = require('mongoose')
const debug = require('./debug')
const status = require('./status')

mongoose.Promise = global.Promise

const reconnect = process.env.MONGO_RECONNECT || false
const reconnectMsTime = process.env.MONGO_RECONNECT_MSTIME || 2000
const maxReconnectionsAttempts = process.env.MONGO_RECONNECT_MAX_ATTEMPTS || 30

const getUrlConnection = ()=>{
    const dbHost = process.env.MONGO_HOST || '127.0.0.1';
    const dbName = process.env.MONGO_DB || 'userpool';
    const dbUserName = process.env.MONGO_USERNAME || '';
    const dbPassword = process.env.MONGO_PASSWORD || '';
    const dbPort = process.env.MONGO_PORT || '27017';

    const urlDB = `mongodb://${dbUserName}${dbPassword ? ':' : ''}${dbPassword}${dbUserName ? '@' : ''}${dbHost}:${dbPort}/${dbName}?authSource=admin`;
    return urlDB
}

const connect = (reconnectionsCounter = 0)=>{
    const urlDB = getUrlConnection()
    debug.dev(urlDB)

    mongoose.connect(urlDB, { useNewUrlParser: true }, (error)=>{
        if(!error){
            debug.log(`Connection to database established successfully`)
            status.database = 'online'
            return
        }
        else{
            status.database = 'offline'

            debug.error('There was an error connecting to the database');
            debug.error(error)
            debug.log(`String connection: ${urlDB}`);

            if(reconnect && !isNaN(reconnectMsTime)){
                reconnectionsCounter++
                if(!isNaN(maxReconnectionsAttempts) && maxReconnectionsAttempts > 0 && reconnectionsCounter > maxReconnectionsAttempts){
                    debug.warn(`Maximum number of reconnections reached: ${maxReconnectionsAttempts}`)
                    return
                }

                if (reconnectMsTime > 0){
                    debug.log(`Restarting connection in ${reconnectMsTime} milliseconds`)
                    setTimeout(()=>{
                        connect(reconnectionsCounter)
                    }, reconnectMsTime)
                }
                else{
                    debug.log(`Restarting connection immediately`)
                    connect(reconnectionsCounter)
                }
            }
        }
    });
}

module.exports = connect()