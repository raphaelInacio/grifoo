const express = require('express')
const router = express.Router()
const authService = require('./authService')
const jwtFilter = require('../jwt/jwt')
const errorMessage = 'Autentication Failed, user or password invalid'

router.post('/accounts/users/auth', jwtFilter.isApp, jwtFilter.isAuth, async function (req, res) {
    try {
        console.log(`Autenticando user: ${JSON.stringify(req.body)}`)
        let auth = await authService.auth(req.body)
        return res.json(auth)
    } catch (error) {
        res.status(401).send({ message: errorMessage });
    }
});

router.post('/accounts/applications/auth', async function (req, res) {
    try {
        console.log(`Autenticando applications: ${JSON.stringify(req.body)}`)
        let auth = await authService.auth(req.body)
        return res.json(auth)
    } catch (error) {
        res.status(401).send({ message: errorMessage });
    }
});



module.exports = router