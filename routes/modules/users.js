const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, password, confirmPassword } = req.body
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.findOne({ name })
      .then(user => {
        if (user) {
          console.log('user exist')
          return res.render('register')
        }
        User.create({ name, password: hash })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err)))
})

module.exports = router
