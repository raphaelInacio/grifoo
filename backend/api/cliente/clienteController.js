const clienteService = require('./clienteService')
const express = require('express')
const router = express.Router()
const basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv

router.get('/clientes', basicAuth(args.USER_NAME, args.USER_PASS), function (req, res) {
    console.log("Listando clientes...")
    clienteService.findAll(res)
})

router.post('/clientes', function (req, res) {
    console.log(`Salvando um novo cliente: ${req.body}`)
    clienteService.save(req.body, res)
})

router.get('/clientes/:id', basicAuth(args.USER_NAME, args.USER_PASS), async (req, res) => {
    try {

        console.log(`Buscando um cliente por id: ${req.params.id}`)
        let id = req.params.id;

        let cliente = await clienteService.findById(id);

        console.log(`Cliente encontrado: ${cliente}`)

        return res.json(cliente)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router