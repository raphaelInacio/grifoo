const AccountsDAO = require('./accounts')
const cryptoUtils = require('../util/cryptoUtil');
const roleTypes = require('../roles/roleTypes')


const AccountsService = {

  findById: async (id) => {
    try {
      let accounts = await AccountsDAO.findById(id)
      return { _id: accounts._id, name: accounts.name, roles: accounts.roles }
    } catch (error) {
      throw error
    }
  },

  save: async (accounts) => {

    try {
 
      let newAccount = new AccountsDAO()
      newAccount.name = accounts.name
      newAccount.password = cryptoUtils.hash(accounts.password)
      newAccount.roles = accounts.roles

      await newAccount.save()

      return { message: "accounts created", _id: accounts._id, name: accounts.name };

    } catch (error) {
      throw error
    }
  }
}

module.exports = AccountsService