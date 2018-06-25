const ParceiroDAO = require('./parceiro')
const queueService = require('../queue/queueServie')

const ParceiroService = {

  findById: async (id) => {
    try {
      let parceiro = ParceiroDAO.findById(id)
      return parceiro
    } catch (error) {
      res.send(error)
    }
  },

  findAll: async () => {
    try {
      let parceiros = ParceiroDAO.find()
      return parceiros
    } catch (error) {
      res.send(error)
    }
  },

  save: async (parceiro) => {

    try {

      let novoparceiro = new ParceiroDAO()

      novoparceiro.nome = parceiro.nome
      novoparceiro.tipo = parceiro.tipo
      novoparceiro.email = parceiro.email
      novoparceiro.telefone = parceiro.telefone
      novoparceiro.descricao = parceiro.descricao
      novoparceiro.mediaValorHora = parceiro.mediaValorHora
      novoparceiro.enderecoId = parceiro.enderecoId
      novoparceiro.cpfCnpj = parceiro.cpfCnpj
      novoparceiro.documentacao = parceiro.documentacao

      let parceiroSalvo = await novoparceiro.save()
      
      await queueService.sendToQueue(JSON.stringify(parceiroSalvo))

      return parceiroSalvo;

    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = ParceiroService