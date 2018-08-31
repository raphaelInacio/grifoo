const mongoose = require('mongoose')
const enviroment = require('./enviroments')
mongoose.Promise = global.Promise
const logger = require('../config/logs')

mongoose.Error.messages.general.require = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo permitido de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo permitido de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."

logger.info(enviroment)

module.exports = mongoose.connect(enviroment.db)