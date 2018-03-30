const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./cors')
const queryParser = require('express-query-int')
const  basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv

module.exports = function (server) {
    
    server.use(bodyParser.urlencoded({
        extended: true
    }))

    console.log(`USER_NAME ${args.USER_NAME}`)
    console.log(`Pass ${args.USER_PASS}`)
    
    server.use(basicAuth(args.USER_NAME, args.USER_PASS))
    server.use(bodyParser.json())
    server.use(cors)
    server.use(queryParser())
    
    const router = express.Router()
    
    server.use('/api/v1', router)
    server.use('/api/v1/', require('../api/cliente/clienteController'))
    server.use('/api/v1/', require('../api/endereco/enderecoController'))
    server.use('/api/v1/', require('../api/evento/eventoController'))
    server.use('/api/v1/', require('../api/pedido/pedidoController'))
}