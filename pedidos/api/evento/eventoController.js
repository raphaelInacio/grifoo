const express = require('express')
const router = express.Router()
const eventoService = require('./eventoService')
const  basicAuth = require('basic-auth-connect');
const yargs = require('yargs')
const args = yargs.argv
const logger = require('../../config/logs')

router.get('/eventos', basicAuth(args.USER_NAME, args.USER_PASS), async function(req, res){
  try {
    let todosEventos = await eventoService.findAll(res)
    return res.json(todosEventos);
  } catch (error) {
    return res.send(error)
  }
})

router.post('/eventos', function(req, res){
  logger.info(`Salvando um novo evento: ${JSON.stringify(req.body)}`)
  eventoService.save(req.body, res)
})


router.get('/eventos/:id', basicAuth(args.USER_NAME, args.USER_PASS), async (req, res) => {
  try {

      logger.info("Buscando um evento por id...")

      let id = req.params.id;

      let evento = await eventoService.findById(id);

      logger.info(`Evento encontrado: ${evento}`)

      return res.json(evento)

  } catch (error) {
      res.send(error)
  }
  
});

module.exports = router