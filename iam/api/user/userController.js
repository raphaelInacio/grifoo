const express = require('express')
const router = express.Router()
const userService = require('./userService')
const filter = require('../jwt/jwt')

router.post('/users', async function (req, res) {
    try {

        console.log(`Salvando um novo parceiro: ${JSON.stringify(req.body)}`)

        let endereco = await userService.save(req.body)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }
});

router.get('/users/:id', filter.isClient, async (req, res) => {
    try {

        console.log(`Buscando um cliente por id: ${req.params.id} ${JSON.stringify(req.payload)} `)

        let id = req.params.id;

        let cliente = await userService.findById(id);

        console.log(`Cliente encontrado: ${JSON.stringify(cliente)}`)

        return res.json(cliente)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router