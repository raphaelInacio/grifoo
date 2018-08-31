const Endereco = require('./endereco')
const logger = require('../../config/logs')

const EnderecoService = {
  findAll: (res) => {
    Endereco.find(function (err, enderecos) {
      if (err)
        res.send(err);
      res.json(enderecos);
    });

  },
  findById: async (id) => {
    try {
      let endereco = Endereco.findById(id)
      return endereco
    } catch (error) {
      res.send(error)
    }
  },
  save: async (endereco) => {

    try {

      let novoEndereco = new Endereco()

      novoEndereco.rua = endereco.rua
      novoEndereco.numero = endereco.numero
      novoEndereco.complemento = endereco.complemento
      novoEndereco.cep = endereco.cep
      novoEndereco.bairro = endereco.bairro
      novoEndereco.cidade = endereco.cidade
      novoEndereco.estado = endereco.estado

      return await novoEndereco.save();

    } catch (error) {
      res.send(error)
    }


    novoEndereco.save(function (err, endereco) {
      if (err)
        res.send(err);
      res.json(endereco);
    });
  }
}

module.exports = EnderecoService