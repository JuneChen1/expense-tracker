const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const recrods = require('./modules/rocords')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/records', authenticator, recrods)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router
