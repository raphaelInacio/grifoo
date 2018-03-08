const Endereco = require('./endereco')

const EnderecoService = {
  findAll: (res) => {
    Endereco.find(function(err, enderecos) {
      if(err)
          res.send(err);
      res.json(enderecos);
  });

  },
  findById: (id, res) => {
    Endereco.findById(id, function(error, endereco) {
      if(error)
          res.send(error);
      res.json(endereco);
  });

  },
  save: (endereco, res) => {
    
    console.log(JSON.stringify(endereco))
    
    let novoEndereco = new Endereco()

    novoEndereco.rua = endereco.rua,
    novoEndereco.numero = endereco.numero,
    novoEndereco.complemento = endereco.complemento,
    novoEndereco.cep = endereco.cep,
    novoEndereco.bairro = endereco.bairro,
    novoEndereco.cidade = endereco.cidade,
    novoEndereco.estado = endereco.estado

    novoEndereco.save(function(err, endereco) {
      if(err)
          res.send(err);
      res.json(endereco);
    });
  }
}

module.exports = EnderecoService
