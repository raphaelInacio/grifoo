const UserDAO = require('../user/user')
const jwt = require('jsonwebtoken')
const enviroments = require('../../config/enviroments')
const cryptoUtils = require('../util/cryptoUtil')

const UserService = {
  auth: async (auth) => {
    try {

      let user = await UserDAO.findOne({ name: auth.name });

      if (!user) {
        throw err;
      }

      if (!cryptoUtils.compare(auth.password, user.password)) {
        throw err;
      }

      let payload = {
        name: user.name,
        roles: user.roles
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

module.exports = UserService