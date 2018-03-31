const clienteService = require('./clienteService')
const express = require('express')
const router = express.Router()
const  basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv
   
router.get('/clientes', basicAuth(args.USER_NAME, args.USER_PASS), function (req, res) {
    console.log("Listando clientes...")
    clienteService.findAll(res)
})

router.post('/clientes', function (req, res) {
    console.log("Salvando um novo cliente...", req)
    clienteService.save(req.body, res)
})

module.exports = router