const express = require('express')
const router = express.Router()
const parceiroService = require('./parceiroService')
const basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv


router.post('/parceiros', async function (req, res) {
    try {

        console.log(`Salvando um novo endereco: ${req.body}`)

        let endereco = await parceiroService.save(req.body)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }
});

router.get('/parceiros/:id', basicAuth(args.USER_NAME, args.USER_PASS), async (req, res) => {
    try {

        console.log(`Buscando um parceiro por id: ${req.params.id}`)

        let id = req.params.id;

        let endereco = await parceiroService.findById(id);

        console.log(`Endereco encontrado: ${endereco}`)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router