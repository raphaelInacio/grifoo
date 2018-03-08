const express = require('express')
const router = express.Router()
const enderecoService = require('./enderecoService')

router.get('/enderecos', function (req, res) {
    console.log("Listando enderecos...")
    enderecoService.findAll(res)
})

router.post('/enderecos', function (req, res) {
    console.log("Salvando um novo endereco...", req)
    enderecoService.save(req.body, res)
})

module.exports = router