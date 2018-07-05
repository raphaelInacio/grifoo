const express = require('express')
const router = express.Router()
const userService = require('./userService')
const filter = require('../jwt/jwt')

router.post('/users', async function (req, res) {
    try {

        console.log(`Criando um novo user: ${JSON.stringify(req.body)}`)

        let user = await userService.save(req.body)

        return res.json(user)

    } catch (error) {
        return res.status(400).send({
            message: 'Erro ao criar usuário'
        });
    }
});

router.get('/users/:id', filter.isClient, async (req, res) => {
    try {

        console.log(`Buscando um user por id: ${req.params.id} ${JSON.stringify(req.payload)} `)

        let id = req.params.id;

        let cliente = await userService.findById(id);

        console.log(`Cliente encontrado: ${JSON.stringify(cliente)}`)

        return res.json(cliente)

    } catch (error) {
        return res.status(400).send({
            message: 'Erro ao buscar usuário'
        });
    }

});

module.exports = router