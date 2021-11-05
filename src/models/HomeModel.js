const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
  Nome: String,
  Sobrenome: String,
  Idade: { type: Number, require: true }
})

const HomeModel = mongoose.model('Home', HomeSchema)

class Home {}

module.exports = Home
