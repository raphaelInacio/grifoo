const clienteService = require('./clienteService')
const express = require('express')
const router = express.Router()
const basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv
const logger = require('../../config/logs')

router.get('/clientes', basicAuth(args.USER_NAME, args.USER_PASS), function (req, res) {
    logger.info("Listando clientes...")
    clienteService.findAll(res)
})

router.post('/clientes', function (req, res) {
    logger.info(`Salvando um novo cliente: ${JSON.stringify(req.body)}`)
    clienteService.save(req.body, res)
})

router.get('/clientes/:id', basicAuth(args.USER_NAME, args.USER_PASS), async (req, res) => {
    try {

        logger.info(`Buscando um cliente por id: ${req.params.id}`)
        let id = req.params.id;

        let cliente = await clienteService.findById(id);

        logger.info(`Cliente encontrado: ${cliente}`)

        return res.json(cliente)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router