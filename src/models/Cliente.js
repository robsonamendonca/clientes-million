const mongoose = require('../config/database'); 

const Cliente = mongoose.model('cliente', {
  nome: {type: String, required: true},
  sobrenome: {type: String},
  cpf: {type: String, required: true, unique: true},
  senha: {type: String, required: true},
  login: {type: String, required: true, unique: true},
  createat: {type: Date, default:new Date().getDate() },
  updatetat: {type: Date, required: true, default:new Date().getDate() }
});

module.exports = Cliente;