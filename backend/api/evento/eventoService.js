const Evento = require('./evento')

const EventoService = {
  findAll: async () => {
    let todosEventos = await Evento.find();
    console.log(`Imprimindo todos eventos, ${todosEventos}`)
    return todosEventos
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