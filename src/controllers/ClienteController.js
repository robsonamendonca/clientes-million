const Cliente = require('../models/Cliente')
const TOKEN = '123456'

const ClienteController = {
  home: async (req, res, next) => {
    return res
      .status(200)
      .json({
        info: 'API Tesouro Direto Cliente - Million - protegido com token'
      })
  },

  index: async (req, res, next) => {
    if (req.headers.token === TOKEN) {
      try {
        const cliente = await Cliente.find({})
        return res.status(200).send(cliente)
      } catch (err) {
        return res.status(401).send(err)
      }
    }
    return res.status(401).json({ error: 'Acesso não autorizado' })
  },

  login: async (req, res, next) => {
    

    if (req.headers.token === TOKEN) {
      try {
        const { login, senha } = req.body
        const clientes = await Cliente.find({login: login, senha: senha})
        if(clientes.length > 0){
          return res.status(200).send({
            _id: clientes[0]._id,
            nome: clientes[0].nome,
            login: clientes[0].login,
            cpf: clientes[0].cpf
          })
        }
        else{
          return res.status(404).send({mensagem: "Cliente não encontrado"})
        }
      } catch (error) {
        res.status(401).send(err)
      }
    }
    return res.status(401).json({ error: 'Acesso não autorizado' })
  },

  getById: async (req, res, next) => {
    if (req.headers.token === TOKEN) {
      try {
        const cliente = await Cliente.findById(req.params.cpf)
        return res.status(200).send(cliente)
      } catch (error) {
        res.status(401).send(err)
      }
    }
    return res.status(401).json({ error: 'Acesso não autorizado' })
  },

  create: async (req, res, next) => {
    if (req.headers.token === TOKEN) {
      const { nome, sobrenome, cpf, senha, login } = req.body
      try {
        const cliente = await Cliente.create({
          nome,
          sobrenome,
          cpf,
          senha,
          login
        })
        return res.status(201).send(cliente)
      } catch (error) {
        return res.status(401).send(error)
      }
    }
    return res.status(401).json({ error: 'Acesso não autorizado' })
  },

  change: async (req, res, next) => {
    if (req.headers.token === TOKEN) {
      const { nome, sobrenome, cpf, senha, login} = req.body
      const {_id} = req.params

      try {
        await Cliente.findOneAndUpdate(
          {_id: _id},
          {
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            senha:senha,
            login
          }
        )
        return res
          .status(204)
          .send(`Alterado com sucesso`)
      } catch (err) {
        console.log(err)
        return res.status(401).send(`Erro: ${err}`)
      }
    }
    return res.status(401).json({ error: 'Acesso não autorizado' })
  },

  delete: async (req, res, next) => {
    if (req.headers.token === TOKEN) {
      try {
        await Cliente.findByIdAndDelete(req.params._id)
        return res.status(204).send({})
      } catch (err) {
        return res.status(401).send(err)
      }
    }
    return res.status(401).json({ error: 'Acesso não autorizado' })
  }
}

module.exports = ClienteController
