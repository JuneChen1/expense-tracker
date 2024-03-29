const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const categories = await Category.find()
  const userId = req.user._id
  let totalAmount = 0
  Record.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => {
        const icon = categories.find(category => record.categoryId === category.id).icon
        record.icon = icon
        record.date = moment(record.date).format('YYYY/MM/DD')
        totalAmount += Number(record.amount)
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

router.get('/sort', async (req, res) => {
  const categoryId = req.query.sort
  const categories = await Category.find()
  const sortName = categories.find(category => category.id.toString() === categoryId.toString()).name
  let totalAmount = 0
  const userId = req.user._id
  Record.find({ categoryId, userId })
    .lean()
    .then(records => {
      records.forEach(record => {
        const icon = categories.find(category => record.categoryId === category.id).icon
        record.icon = icon
        record.date = moment(record.date).format('YYYY/MM/DD')
        totalAmount += Number(record.amount)
      })
      res.render('index', { records, totalAmount, sortName })
    })
    .catch(err => console.log(err))
})

module.exports = router
