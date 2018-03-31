const express = require('express')
const router = express.Router()
const enderecoService = require('./enderecoService')
const  basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv


router.get('/enderecos', basicAuth(args.USER_NAME, args.USER_PASS), function (req, res) {
    console.log("Listando enderecos...")
    enderecoService.findAll(res)
})

router.post('/enderecos', function (req, res) {
    console.log("Salvando um novo endereco...", req)
    enderecoService.save(req.body, res)
})

module.exports = router