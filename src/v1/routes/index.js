const router = new require('express').Router()
const masterAuth = require('./masterAuth')
const masterAuthRoute = process.env.MASTER_AUTH_ROUTE || '/master/auth'
router.post(masterAuthRoute, masterAuth)

// api/v1/app
const validateMasterToken = require('./validateMasterToken')
const createApp = require('./createApp')
//router.use('/app', validateMasterToken)
router.post('/app/create', validateMasterToken, createApp)

const appAuth = require('./appAuth')
router.post('/app/auth', appAuth)
const validateAppTokenEndPoint = require('./validateAppTokenEndPoint')
router.post('/app/validate/token', validateAppTokenEndPoint)

const validateAppToken = require('./validateAppToken')
router.use('/', validateAppToken)

// api/v1/user
const createUser = require('./createUser')
router.post('/user/create', createUser)

const getUser = require('./getUser')
router.get('/user/:login', getUser)

const removeUser = require('./removeUser')
router.delete('/user/:login', removeUser)

const updateUserMeta = require('./updateUserMeta')
router.put('/user/:login/meta', updateUserMeta)

const removeUserMeta = require('./removeUserMeta')
router.delete('/user/:login/meta/:key', removeUserMeta)

const userAuth = require('./userAuth.js')
router.post('/user/auth', userAuth)

const validateUserToken = require('./validateUserToken')
router.post('/user/validate/token', validateUserToken)

// api/v1/profile
const createProfile = require('./createProfile')
router.post('/profile/create', createProfile)

const attachProfile = require('./attachProfile')
router.post('/profile/attach', attachProfile)

const detachProfile = require('./detachProfile')
router.post('/profile/detach', detachProfile)

// final api requests
const notFoundedRequest = require('./404')
router.use(notFoundedRequest)

module.exports = router