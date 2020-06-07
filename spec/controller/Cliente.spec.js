const supertest = require('supertest')
const app = require('../../src/app')
const Cliente = require('../../src/models/Cliente')
const request = supertest(app)
const TOKEN = '123456'

describe('clienteController', () => {
    beforeEach( async() => {
        await Cliente.deleteMany()
    })
    it('deveria retornar status code de 200', async () => {
        const response = await request.get('/cliente').set('token', TOKEN)
        expect(response.status).toBe(200)
    })
    it('deveria retornar status code 201', async () =>{
        const body = {nome:"TESTE DE NOME",sobrenome:"TESTE DE SOBRENOME",cpf:"123456789",senha:"12345",login:"TESTE_DE_LOGIN"}
        const response = await request.post('/cliente').set('token', TOKEN).send(body)
        expect(response.status).toBe(201)
    })
    it('deveria retornar status code 204 para método PUT', async () => {
        const cliente = await Cliente.create({nome:"TESTE DE NOME",sobrenome:"TESTE DE SOBRENOME",cpf:"123456789",senha:"12345",login:"TESTE_DE_LOGIN"})
        const response = await request.put('/cliente/' + cliente._id).set('token', TOKEN).send({nome:"TESTE DE NOME2",sobrenome:"TESTE DE SOBRENOME2",cpf:"123456889",senha:"123456",login:"test02"})
        expect(response.status).toBe(204)
    }) 
    it('deveria retornar status code 204 para método DELETE', async () => {
        const cliente = await Cliente.create({nome:"TESTE DE NOME",sobrenome:"TESTE DE SOBRENOME",cpf:"123456789",senha:"12345",login:"TESTE_DE_LOGIN"})
        const response = await request.delete('/cliente/' + cliente._id).set('token',TOKEN)
        expect(response.status).toBe(204)
    })

    it('deveria fazer o login de um cliente', async () => {
        const cliente = await Cliente.create({nome:"TESTE DE NOME",sobrenome:"TESTE DE SOBRENOME",cpf:"123456789",senha:"123456",login:"TESTE_DE_LOGIN"})
        const response = await request.post('/cliente/login').set('token', TOKEN).send({senha:"123456",login:"TESTE_DE_LOGIN"})
        expect(response.status).toBe(200)
    }) 
})