const express = require('express')
const router = express.Router()
const CATEGORY = require('../../category.json').data

// add new record
router.get('/new', (req, res) => {
  const categorys = []
  CATEGORY.forEach(category => {
    categorys.push({
      id: category.id,
      name: category.name
    })
  })
  res.render('new', { categorys })
})

router.post('/new', (req, res) => {
  const record = req.body
  console.log(record)
  res.redirect('/')
})

module.exports = router
