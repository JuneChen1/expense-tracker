const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, password, confirmPassword } = req.body
  const error = {}
  const errorMessage = {
    error,
    name,
    password,
    confirmPassword
  }

  if (password !== confirmPassword) {
    error.message = '密碼與確認密碼不相符'
    return res.render('register', errorMessage)
  }

  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.findOne({ name })
      .then(user => {
        if (user) {
          error.message = '這個名稱已被註冊'
          return res.render('register', errorMessage)
        }
        User.create({ name, password: hash })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err)))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出。')
  res.redirect('/users/login')
})

module.exports = router
