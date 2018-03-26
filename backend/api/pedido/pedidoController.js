const pedidoService = require('./pedidoService')
const express = require('express')
const router = express.Router()

router.get('/pedidos', async function (req, res) {
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
            "ABERTO": 'ABERTO',
            "enderecoId": req.body.enderecoId
        }

        let pedidoSalvo = await pedidoService.save(novoPedido);

        return res.json(pedidoSalvo)

    } catch (error) {
        res.send(error)
    }

})


module.exports = router