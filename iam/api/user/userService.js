const UserDAO = require('./user')
const cryptoUtils = require('../util/cryptoUtil');
const roleTypes = require('../roles/roleTypes')


const UserService = {

  findById: async (id) => {
    try {
      let user = await UserDAO.findById(id)
      return { _id: user._id, name: user.name, roles: user.roles }
    } catch (error) {
      throw error
    }
  },

  save: async (user) => {

    try {

      if (!roleTypes.validateRole(roleTypes.roles, user.roles[0])) {
        throw new Error("Erro ao criar usuário")
      }

      let novoUser = new UserDAO()
      novoUser.name = user.name
      novoUser.password = cryptoUtils.hash(user.password)
      novoUser.roles = user.roles

      await novoUser.save()

      return { message: "User created", _id: user._id, name: user.name };

    } catch (error) {
      throw error
    }
  }
}

module.exports = UserService