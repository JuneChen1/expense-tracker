const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'name', passReqToCallback: true },
  (req, name, password, done) => {
    User.findOne({ name })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', '無此使用者，請確認名稱輸入正確'))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('warning_msg', '名稱或密碼錯誤'))
            }
            return done(null, user)
          })
      })
      .catch(err => console.log(err))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
