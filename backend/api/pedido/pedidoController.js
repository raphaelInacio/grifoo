const pedidoService = require('./pedidoService')
const express = require('express')
const router = express.Router()

const  basicAuth = require('basic-auth-connect');
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

        console.log("Salvando um novo pedido...")

        let novoPedido = {
            "clienteId": req.body.clienteId,
            "eventoId": req.body.eventoId,
            "status": 'ABERTO',
            "enderecoId": req.body.enderecoId,
            "tipoPedido" : req.body.tipoPedido
        }

        let pedidoSalvo = await pedidoService.save(novoPedido);

        return res.json(pedidoSalvo)

    } catch (error) {
        res.send(error)
    }

})


module.exports = router