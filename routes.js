const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const testController = require('./src/controllers/testController')

route.get('/', homeController.paginaInicial)
route.post('/', homeController.trataPost)
route.get('/teste/:idUsuario?', testController.testeUser)
module.exports = route
