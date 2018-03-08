const express = require('express')
const router = express.Router()
const eventoService = require('./eventoService')

router.get('/eventos', function(req, res){
  console.log("Listando eventos...")
  eventoService.findAll(res)
})

router.post('/eventos', function(req, res){
  console.log("Salvando um novo cliente...", req)
  eventoService.save(req.body, res)
})

module.exports = router