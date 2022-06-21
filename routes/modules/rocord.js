const express = require('express')
const router = express.Router()

// add new record
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const record = req.body
  console.log(record)
  res.redirect('/')
})

module.exports = router
