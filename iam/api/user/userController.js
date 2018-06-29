const express = require('express')
const router = express.Router()
const userService = require('./userService')
const jwtFilter = require('../jwt/jwt')

router.post('/users', async function (req, res) {
    try {

        console.log(`Salvando um novo parceiro: ${JSON.stringify(req.body)}`)

        let endereco = await userService.save(req.body)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }
});

router.get('/users/:id', jwtFilter, async (req, res) => {
    try {

        console.log(`Buscando um parceiro por id: ${req.params.id} ${JSON.stringify(req.decoded)} `)

        let id = req.params.id;

        let endereco = await userService.findById(id);

        console.log(`Parceiro encontrado: ${endereco}`)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router