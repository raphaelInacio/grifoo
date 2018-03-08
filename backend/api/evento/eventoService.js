const Evento = require('./evento')

const EventoService = {
  findAll: (res) => {
    Evento.find(function(err, eventos) {
      if(err)
          res.send(err);
      res.json(eventos);
  });

  },
  findById: (id, res) => {
    Evento.findById(id, function(error, evento) {
      if(error)
          res.send(error);
      res.json(evento);
  });

  },
  save: (evento, res) => {
    
    console.log(JSON.stringify(evento))
    
    let novoEvento = new Evento()

    novoEvento.tipoEvento = evento.tipoEvento,
    novoEvento.outrasInformacoes = evento.outrasInformacoes,
    novoEvento.dataHoraDeTermino = evento.dataHoraDeTermino,
    novoEvento.dataHoraDeInicio = evento.dataHoraDeInicio,
    novoEvento.numeroPessoas = evento.numeroPessoas

    novoEvento.save(function(err, evento) {
      if(err)
          res.send(err);
      res.json(evento);
    });
  }
}

module.exports = EventoService