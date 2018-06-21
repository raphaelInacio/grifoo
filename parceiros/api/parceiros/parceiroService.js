const ParceiroDAO = require('./parceiro')

const ParceiroService = {
  findById: async (id) => {
    try {
      let parceiro = ParceiroDAO.findById(id)
      return parceiro
    } catch (error) {
      res.send(error)
    }
  },
  save: async (parceiro) => {
    try {
      let novoparceiro = new ParceiroDAO()
      return await novoparceiro.save();
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = ParceiroService