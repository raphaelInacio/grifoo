const express = require('express')
const router = express.Router()
const userService = require('./userService')

router.post('/users', async function (req, res) {
    try {

        console.log(`Salvando um novo parceiro: ${JSON.stringify(req.body)}`)

        let endereco = await userService.save(req.body)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }
});

router.get('/users/:id', async (req, res) => {
    try {

        console.log(`Buscando um parceiro por id: ${req.params.id}`)

        let id = req.params.id;

        let endereco = await userService.findById(id);

        console.log(`Parceiro encontrado: ${endereco}`)

        return res.json(endereco)

    } catch (error) {
        res.send(error)
    }

});


router.get('/users', async (req, res) => {
    try {

        console.log(`Buscando todos users`)

        let enderecos = await userService.findAll();

        console.log(`Todos users: ${JSON.stringify(enderecos)}`)

        return res.json(enderecos)

    } catch (error) {
        res.send(error)
    }

});

module.exports = router