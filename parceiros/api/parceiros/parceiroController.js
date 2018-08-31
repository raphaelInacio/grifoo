const express = require('express')
const router = express.Router()
const parceiroService = require('./parceiroService')
const basicAuth = require('basic-auth-connect');
const enviroment = require('../../config/enviroments')
const logger = require('../../config/logs')


router.post('/parceiros', async function (req, res) {
    try {

        logger.info(`Salvando um novo parceiro: ${JSON.stringify(req.body)}`)

        let endereco = await parceiroService.save(req.body)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }
});

router.get('/parceiros/:id', basicAuth(enviroment.user, enviroment.pass), async (req, res) => {
    try {

        logger.info(`Buscando um parceiro por id: ${req.params.id}`)

        let id = req.params.id;

        let endereco = await parceiroService.findById(id);

        logger.info(`Parceiro encontrado: ${endereco}`)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }

});


router.get('/parceiros', basicAuth(enviroment.user, enviroment.pass), async (req, res) => {
    try {

        logger.info(`Buscando todos parceiros`)

        let enderecos = await parceiroService.findAll();

        logger.info(`Todos parceiros: ${JSON.stringify(enderecos)}`)

        return res.json(enderecos)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router