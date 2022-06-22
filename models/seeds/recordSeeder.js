const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user')
const Record = require('../record')
const SEED_RECORD = require('../../seedrecord.json').data

db.once('open', () => {
  Promise.all(Array.from(SEED_RECORD, seedRecord => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedRecord.password, salt))
      .then(hash => User.create({
        name: seedRecord.name,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        seedRecord.records.forEach(record => {
          record.userId = userId
        })
        return Record.create(seedRecord.records)
      })
  }))
    .then(() => {
      console.log('record seed created')
      process.exit()
    })
})
