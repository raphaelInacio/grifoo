const express = require('express')
const router = express.Router()
const eventoService = require('./eventoService')
const  basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv

router.get('/eventos', basicAuth(args.USER_NAME, args.USER_PASS), async function(req, res){
  try {
    let todosEventos = await eventoService.findAll(res)
    return res.json(todosEventos);
  } catch (error) {
    return res.send(error)
  }
})

router.post('/eventos', function(req, res){
  console.log("Salvando um novo cliente...", req)
  eventoService.save(req.body, res)
})

module.exports = router