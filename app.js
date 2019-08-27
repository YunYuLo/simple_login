const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const checkMembership = require('./membership')
const port = 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const inputData = req.body
  const userData = checkMembership(inputData)
  const error = "Username/Password錯誤"

  if (userData == false) {
    res.render('index', ({ inputData, error }))
  } else {
    res.render('welcome', ({ userData }))
  }
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})