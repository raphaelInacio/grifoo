const express = require('express')
const router = express.Router()
const parceiroService = require('./parceiroService')
const basicAuth = require('basic-auth-connect');
const enviroment = require('../../config/enviroments')

router.post('/parceiros', async function (req, res) {
    try {

        console.log(`Salvando um novo parceiro: ${req.body}`)

        let endereco = await parceiroService.save(req.body)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }
});

router.get('/parceiros/:id', basicAuth(enviroment.user, enviroment.pass), async (req, res) => {
    try {

        console.log(`Buscando um parceiro por id: ${req.params.id}`)

        let id = req.params.id;

        let endereco = await parceiroService.findById(id);

        console.log(`Parceiro encontrado: ${endereco}`)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }

});


router.get('/parceiros', basicAuth(enviroment.user, enviroment.pass), async (req, res) => {
    try {

        console.log(`Buscando todos parceiros`)
        
        let enderecos = await parceiroService.findAll();

        console.log(`Todos parceiros: ${enderecos}`)

        return res.json(enderecos)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router