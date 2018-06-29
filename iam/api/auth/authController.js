const express = require('express')
const router = express.Router()
const authService = require('./authService')

router.post('/auth', async function (req, res) {
    try {
        console.log(`Autenticando user: ${JSON.stringify(req.body)}`)
        let auth = await authService.auth(req.body)
        return res.json(auth)
    } catch (error) {
        res.status(401).send({ message: 'Autentication Failed, user or password invalid' });
    }
});

module.exports = router