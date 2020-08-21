const express = require('express')
const { join } = require('path')

const app = express()
// Allows us to access the static resoures (CSS files, html, js)
app.use(express.static(join(__dirname, 'public')))
// Allows us to interact with URL bar
app.use(express.urlencoded({ extended: true }))
// Allows us to understand json in the application
app.use(express.json())
// Allows us ot access our routes
app.use(require('./routes'))
// What ports the server should be listening on (deployed vs. local)
app.listen(process.env.PORT || 3000)
