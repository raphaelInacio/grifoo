const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./cors')
const queryParser = require('express-query-int')
const basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv

module.exports = function (server) {

    const API_VERSION = "/api/v1/parceiros"

    server.use(bodyParser.urlencoded({
        extended: true
    }))

    console.log(`USER_NAME ${args.USER_NAME}`)
    console.log(`Pass ${args.USER_PASS}`)

    const router = express.Router()
    
    server.use(bodyParser.json())
    server.use(cors)
    server.use(queryParser())
    
    server.use(API_VERSION, router)
    server.use(API_VERSION, require('../api/cliente/clienteController'))
    server.use(API_VERSION, require('../api/endereco/enderecoController'))
    server.use(API_VERSION, require('../api/evento/eventoController'))
    server.use(API_VERSION, require('../api/pedido/pedidoController'))
}