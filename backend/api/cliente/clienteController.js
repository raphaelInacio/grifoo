const clienteService = require('./clienteService')
const express = require('express')
const router = express.Router()

router.get('/clientes', function (req, res) {
    console.log("Listando clientes...")
    clienteService.findAll(res)
})

router.post('/clientes', function (req, res) {
    console.log("Salvando um novo cliente...", req)
    clienteService.save(req.body, res)
})

module.exports = router