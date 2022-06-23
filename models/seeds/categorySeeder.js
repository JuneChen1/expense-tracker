const db = require('../../config/mongoose')
const Category = require('../category')
const CATEGORY = require('./category.json').data

db.once('open', () => {
  Promise.all(Array.from(CATEGORY, category => {
    return Category.create({
      id: category.id,
      name: category.name,
      icon: category.icon
    })
  }))
    .then(() => {
      console.log('category seed created')
      process.exit()
    })
})
