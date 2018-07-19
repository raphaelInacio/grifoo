const AccountsDAO = require('../accounts/accounts')
const jwt = require('jsonwebtoken')
const enviroments = require('../../config/enviroments')
const cryptoUtils = require('../util/cryptoUtil')
const roles = require('../roles/roleTypes').role

const AuthService = {
  auth: async (auth) => {
    try {

      let accounts = await AccountsDAO.findOne({ name: auth.name });

      if (!accounts) {
        throw err;
      }

      if (!cryptoUtils.compare(auth.password, accounts.password)) {
        throw err;
      }

      accounts.roles.push(roles.autenticado)
      
      let payload = {
        name: accounts.name,
        roles: accounts.roles
      }

      let token = jwt.sign(payload, enviroments.secret, {
        expiresIn: 1440
      })

      return { message: 'Authentication Success', token: token };

    } catch (error) {
      throw err;
    }
  }

}

module.exports = AuthService