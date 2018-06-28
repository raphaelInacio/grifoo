const pedidoService = require('./pedidoService')
const express = require('express')
const router = express.Router()

const basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv


router.get('/pedidos', basicAuth(args.USER_NAME, args.USER_PASS), async function (req, res) {
    try {
        let todosPedidos = await pedidoService.findAll();
        console.log(`Todos os pedidos ${todosPedidos}`)
        return res.json(todosPedidos);
    } catch (error) {
        res.send(error);
    }
})

router.post('/pedidos', async function (req, res) {

    try {

        console.log(`Salvando um novo pedido: ${req.body}`)

        let pedidoSalvo = await pedidoService.save(req.body);

        return res.json(pedidoSalvo)

    } catch (error) {
        res.send(error)
    }

})

router.get('/pedidos/:id', basicAuth(args.USER_NAME, args.USER_PASS), async (req, res) => {
    try {

        console.log(`Buscando um pedido por id: ${req.params.id}`)

        let id = req.params.id;

        let pedido = await pedidoService.findById(id);

        console.log(`Pedido encontrado: ${pedido}`)

        return res.json(pedido)

    } catch (error) {
        res.send(error)
    }
});


module.exports = router