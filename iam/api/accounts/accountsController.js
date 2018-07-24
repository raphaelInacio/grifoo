const express = require('express')
const router = express.Router()
const accountsService = require('./accountsService')
const jwtFilter = require('../jwt/jwt')

router.post('/accounts', async function (req, res) {
    try {

        console.log(`Criando uma nova account: ${JSON.stringify(req.body)}`)

        let user = await accountsService.save(req.body)

        return res.json(user)

    } catch (error) {
        return res.status(400).send({
            message: 'Erro ao criar accounts'
        });
    }
});

router.get('/accounts/:id', jwtFilter.isApp, jwtFilter.isAuth,  async (req, res) => {
    try {

        console.log(`Buscando um user por id: ${req.params.id}, ${JSON.stringify(req.payload)} `)

        let id = req.params.id;

        let accounts = await accountsService.findById(id);

        console.log(`accounts encontrado: ${JSON.stringify(accounts)}`)

        return res.json(accounts)

    } catch (error) {
        return res.status(400).send({
            message: 'Erro ao buscar accounts'
        });
    }

});

module.exports = router