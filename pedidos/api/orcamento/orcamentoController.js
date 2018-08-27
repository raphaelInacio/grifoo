const pedidoService = require('../pedido/pedidoService')
const express = require('express')
const router = express.Router()

const basicAuth = require('basic-auth-connect');
const enviroments = require('../../config/enviroments')

router.post('/orcamentos/:id', basicAuth(enviroments.user, enviroments.pass), async function (req, res) {
    
    try {
        
        let id = req.params.id;
        let orcamento = req.body
        
        console.log(`Salvando um novo orcamento: ${id}, ${JSON.stringify(orcamento)}`)

        let pedidoSalvo = await pedidoService.incluirOrcamento(id, orcamento);

        return res.json(pedidoSalvo)
    } catch (error) {
        res.send(error)
    }

})

router.patch('/orcamentos/:pedidoId/selecionar/:parceiroId', basicAuth(enviroments.user, enviroments.pass), async function (req, res) {
    
    try {
        
        let pedidoId = req.params.pedidoId;
        let parceiroId = req.params.parceiroId;
        
        console.log(`Selecionando orcamento: ${pedidoId} do parceiro ${parceiroId} }`)

        let pedidoSalvo = await pedidoService.selecionarOrcamento(pedidoId, parceiroId);

        return res.json(pedidoSalvo)
    } catch (error) {
        res.send(error)
    }

})


router.patch('/orcamentos/:pedidoId/reprovar/:parceiroId', basicAuth(enviroments.user, enviroments.pass), async function (req, res) {
    
    try {
        
        let pedidoId = req.params.pedidoId;
        let parceiroId = req.params.parceiroId;
        
        console.log(`Reprovando orcamento: ${pedidoId} do parceiro ${parceiroId} }`)

        let pedidoSalvo = await pedidoService.reprovarOrcamento(pedidoId, parceiroId);

        return res.json(pedidoSalvo)
    } catch (error) {
        res.send(error)
    }

})

router.patch('/orcamentos/:pedidoId/cancelar-selecao/:parceiroId', basicAuth(enviroments.user, enviroments.pass), async function (req, res) {
    
    try {
        
        let pedidoId = req.params.pedidoId;
        let parceiroId = req.params.parceiroId;
        
        console.log(`Cancelando orcamento: ${pedidoId} do parceiro ${parceiroId} }`)

        let pedidoSalvo = await pedidoService.cancelarSelecaoOrcamento(pedidoId, parceiroId);

        return res.json(pedidoSalvo)
    } catch (error) {
        res.send(error)
    }

})

module.exports = router