const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')

// add new record
router.get('/new', async (req, res) => {
  const categorys = await Category.find().lean().sort({ id: 'asc' })
  res.render('new', { categorys })
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  Record.create({
    name,
    date,
    categoryId,
    amount,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// edit record
router.get('/edit/:id', async (req, res) => {
  let categorys = await Category.find().lean().sort({ id: 'asc' })
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      const currentCategory = categorys.find(category => record.categoryId === category.id).name
      categorys = categorys.filter(category => record.categoryId !== category.id)
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record, categorys, currentCategory })
    })
    .catch(err => console.log(err))
})

router.put('/edit/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// delete record
router.delete('/delete/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
