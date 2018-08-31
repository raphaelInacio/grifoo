const express = require('express')
const router = express.Router()
const basicAuth = require('basic-auth-connect');
const enviroments = require('../../config/enviroments')
const logger = require('../../config/logs')
const pedidoService = require('./pedidoService')

router.get('/pedidos', basicAuth(enviroments.user, enviroments.pass), async function (req, res) {
    try {
        let todosPedidos = await pedidoService.findAll();
        logger.info(`Todos os pedidos ${todosPedidos}`)
        return res.json(todosPedidos);
    } catch (error) {
        res.send(error);
    }
})

router.post('/pedidos', async function (req, res) {

    try {

        logger.info(`Salvando um novo pedido: ${JSON.stringify(req.body)}`)

        let pedidoSalvo = await pedidoService.save(req.body);

        return res.json(pedidoSalvo)

    } catch (error) {
        res.send(error)
    }

})

router.get('/pedidos/:id', basicAuth(enviroments.user, enviroments.pass), async (req, res) => {
    try {

        logger.info(`Buscando um pedido por id: ${req.params.id}`)

        let id = req.params.id;

        let pedido = await pedidoService.findById(id);

        logger.info(`Pedido encontrado: ${pedido}`)

        return res.json(pedido)

    } catch (error) {
        res.send(error)
    }
});

router.post('/pedidos/:id/orcamentos', basicAuth(enviroments.user, enviroments.pass), async function (req, res) {

    try {

        let id = req.params.id;
        let orcamento = req.body

        logger.info(`Salvando um novo orcamento: ${id}, ${orcamento}`)

        let pedidoSalvo = await pedidoService.incluirOrcamento(id, orcamento);

        return res.json(pedidoSalvo)
    } catch (error) {
        res.send(error)
    }

})


module.exports = router