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
  
  if (password !== confirmPassword) {
    const error = { message: '密碼與確認密碼不相符' }
    return res.render('register', {
      error,
      name,
      password,
      confirmPassword
    })
  }
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

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出。')
  res.redirect('/users/login')
})

module.exports = router
