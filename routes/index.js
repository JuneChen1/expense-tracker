const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const recrod = require('./modules/rocord')

router.use('/records', recrod)
router.use('/', home)

module.exports = router
