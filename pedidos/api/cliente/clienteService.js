const Cliente = require('./cliente')
const logger = require('../../config/logs')

const ClienteService = {
  findAll: (res) => {
    Cliente.find(function (err, clientes) {
      if (err)
        res.send(err);
      res.json(clientes);
    });

  },
  findById: async (id) => {
    let cliente = await Cliente.findById(id);
    return cliente;
  },
  save: (cliente, res) => {

    logger.info(JSON.stringify(cliente))

    let novoCliente = new Cliente()

    novoCliente.nome = cliente.nome
    novoCliente.email = cliente.email
    novoCliente.telefone = cliente.telefone

    novoCliente.save(function (err, cliente) {
      if (err)
        res.send(err);
      res.json(cliente);
    });
  }
}

module.exports = ClienteService