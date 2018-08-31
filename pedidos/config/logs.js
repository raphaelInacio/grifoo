const log4js = require('log4js');
log4js.configure({
  appenders: { pedido: { type: 'file', filename: 'pedidos.log' } },
  categories: { default: { appenders: ['pedido'], level: 'info' } }
});
const logger = log4js.getLogger('pedido');
module.exports = logger