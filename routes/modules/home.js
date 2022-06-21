const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const categories = await Category.find()
  console.log(categories)
  Record.find()
    .sort({ 'date': 'asc'})
    .lean()
    .then(records => {
      records.forEach(record => {
        let year = record.date.getYear() + 1900
        let month = record.date.getMonth() + 1
        let date = record.date.getDate().toString()
        record.date = year + '/' + month + '/' + date
        const icon = categories.find(category => record.categoryId === category.id).icon
        record.icon = icon
      })
      res.render('index', { records })
    })
    .catch(err => console.log(err))
})

module.exports = router
