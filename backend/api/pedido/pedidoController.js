const pedidoService = require('./pedidoService')
const express = require('express')
const router = express.Router()


router.get('/pedidos', function(req, res){
    console.log("Listando pedidos...")
    pedidoService.findAll(res)
})

router.post('/pedidos', function(req, res){
    console.log("Salvando um Pedido...")
    pedidoService.save(req.body, res)
})

module.exports = router