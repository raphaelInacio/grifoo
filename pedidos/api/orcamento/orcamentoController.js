const pedidoService = require('../pedido/pedidoService')
const express = require('express')
const router = express.Router()

const basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv


router.post('/orcamentos/:id', basicAuth(args.USER_NAME, args.USER_PASS), async function (req, res) {
    
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

module.exports = router