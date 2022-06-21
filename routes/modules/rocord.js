const express = require('express')
const router = express.Router()
const CATEGORY = require('../../category.json').data
const Record = require('../../models/record')
const Category = require('../../models/category')

// add new record
router.get('/new', async (req, res) => {
  const categorys = await Category.find().lean().sort({ 'id': 'asc' })
  res.render('new', { categorys })
})

router.post('/new', (req, res) => {
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
