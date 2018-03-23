const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./cors')
const queryParser = require('express-query-int')

module.exports = function (server) {
    
    dotenv.config();
    
    server.use(bodyParser.urlencoded({
        extended: true
    }))
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