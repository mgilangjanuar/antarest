var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var antarest = require('./lib/antarest')

var app = express()

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/cats')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var Cat = mongoose.model('Cat', new mongoose.Schema({ name: String, age: Number, birth: Date }))
var Dog = mongoose.model('Dog', new mongoose.Schema({ name: String, age: Number, birth: Date }))

app.use(antarest([
  { path: '/cat', model: Cat },
  { path: '/dog', model: Dog }
], { NotFoundHandler: true }))

app.listen(6969)