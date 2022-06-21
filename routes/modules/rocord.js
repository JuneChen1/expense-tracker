const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')
const { rawListeners } = require('../../models/record')

// add new record
router.get('/new', async (req, res) => {
  const categorys = await Category.find().lean().sort({ id: 'asc' })
  res.render('new', { categorys })
})

router.post('/new', (req, res) => {
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// edit record
router.get('/edit/:id', async (req, res) => {
  let categorys = await Category.find().lean().sort({ id: 'asc' })
  const _id = req.params.id
  Record.findOne({ _id })
    .lean()
    .then(record => {
      const currentCategory = categorys.find(category => record.categoryId === category.id).name
      categorys = categorys.filter(category => record.categoryId !== category.id)
      record.date = moment(record.date).format("YYYY-MM-DD")
      res.render('edit', { record, categorys, currentCategory})
    })
    .catch(err => console.log(err))
})

router.put('/edit/:id', (req, res) => {
  const _id = req.params.id
  Record.findOneAndUpdate({ _id }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// delete record
router.delete('/delete/:id', (req, res) => {
  const _id = req.params.id
  Record.findOneAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
