const express = require('express')
const router = express.Router()
const enderecoService = require('./enderecoService')
const basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv


router.get('/enderecos', basicAuth(args.USER_NAME, args.USER_PASS), function (req, res) {
    console.log("Listando enderecos...")
    enderecoService.findAll(res)
})

router.post('/enderecos', async function (req, res) {
    try {
    
        console.log(`Salvando um novo endereco: ${req.body}`)

        let endereco = await enderecoService.save(req.body)

        return res.json(endereco)
    
    } catch (error) {
        res.send(error)
    }
})

router.get('/enderecos/:id', basicAuth(args.USER_NAME, args.USER_PASS), async (req, res) => {
    try {

        console.log(`Buscando um endereco por id: ${req.params.id}`)

        let id = req.params.id;

        let endereco = await enderecoService.findById(id);

        console.log(`Endereco encontrado: ${endereco}`)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router