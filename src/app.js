const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, application/json, Content-Type, Accept, token")
  next();
})

app.use('/',require('./routes'))

module.exports = app