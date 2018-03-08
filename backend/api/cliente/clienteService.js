const Cliente = require('./cliente')


const ClienteService = {
  findAll: (res) => {
    Cliente.find(function(err, clientes) {
      if(err)
          res.send(err);
      res.json(clientes);
  });

  },
  findById: (id, res) => {
    Cliente.findById(id, function(error, cliente) {
      if(error)
          res.send(error);
      res.json(cliente);
  });

  },
  save: (cliente, res) => {
    
    console.log(JSON.stringify(cliente))
    
    let novoCliente = new Cliente()
    novoCliente.nome = cliente.nome,
    novoCliente.email = cliente.email,
    novoCliente.telefone = cliente.telefone 

    novoCliente.save(function(err, cliente) {
      if(err)
          res.send(err);
      res.json(cliente);
    });
  }
}

module.exports = ClienteService
