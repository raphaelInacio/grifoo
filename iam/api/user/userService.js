const UserDAO = require('./user')
const cryptoUtils = require('../util/cryptoUtil');


const UserService = {

  findById: async (id) => {
    try {
      let user = await UserDAO.findById(id)
      return { _id: user._id, name: user.name, roles: user.roles }
    } catch (error) {
      res.send(error)
    }
  },

  save: async (user) => {

    try {

      let novoUser = new UserDAO()

      novoUser.name = user.name
      novoUser.password = cryptoUtils.hash(user.password)
      novoUser.roles = user.roles

      await novoUser.save()

      return { message: "User created", _id: user._id, name: user.name, roles: user.roles };

    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = UserService