const {Router} = require('express')
const route = Router()
const ClienteController = require('./controllers/ClienteController')

route.get('/', ClienteController.home)
route.get('/cliente', ClienteController.index)
route.post('/cliente/login', ClienteController.login)
route.post('/cliente', ClienteController.create)
route.put('/cliente/:_id', ClienteController.change)
route.delete('/cliente/:_id', ClienteController.delete)

module.exports = route
