const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const recrods = require('./modules/rocords')
const users = require('./modules/users')

router.use('/records', recrods)
router.use('/users', users)
router.use('/', home)

module.exports = router
