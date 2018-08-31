const express = require('express')
const router = express.Router()
const enderecoService = require('./enderecoService')
const basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv
const logger = require('../../config/logs')

router.get('/enderecos', basicAuth(args.USER_NAME, args.USER_PASS), function (req, res) {
    logger.info("Listando enderecos...")
    enderecoService.findAll(res)
})

router.post('/enderecos', async function (req, res) {
    try {
    
        logger.info(`Salvando um novo endereco:  ${JSON.stringify(req.body)}`)

        let endereco = await enderecoService.save(req.body)

        return res.json(endereco)
    
    } catch (error) {
        res.send(error)
    }
})

router.get('/enderecos/:id', basicAuth(args.USER_NAME, args.USER_PASS), async (req, res) => {
    try {

        logger.info(`Buscando um endereco por id: ${req.params.id}`)

        let id = req.params.id;

        let endereco = await enderecoService.findById(id);

        logger.info(`Endereco encontrado: ${endereco}`)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router