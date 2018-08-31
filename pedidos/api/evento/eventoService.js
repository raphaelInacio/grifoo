const Evento = require('./evento')
const logger = require('../../config/logs')

const EventoService = {
  findAll: async () => {
    let todosEventos = await Evento.find();
    logger.info(`Imprimindo todos eventos, ${todosEventos}`)
    return todosEventos
  },
  findById: async (id) => {
    let evento = await Evento.findById(id);
    return evento;
  },
  save: (evento, res) => {

    logger.info(JSON.stringify(evento))

    let novoEvento = new Evento()

    novoEvento.tipoEvento = evento.tipoEvento
    novoEvento.outrasInformacoes = evento.outrasInformacoes
    novoEvento.duracaoEvento = evento.duracaoEvento
    novoEvento.dataHoraDeInicio = evento.dataHoraDeInicio
    novoEvento.numeroPessoas = evento.numeroPessoas

    novoEvento.save(function (err, evento) {
      if (err)
        res.send(err);
      res.json(evento);
    });
  }
}

module.exports = EventoService