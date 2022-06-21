const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()

require('dotenv').config()
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Express is running on http://localhost:${process.env.PORT}`)
})
