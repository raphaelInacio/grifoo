const log4js = require('log4js');
log4js.configure( `${__dirname}/log4js.json`);
const logger = log4js.getLogger('pedidos');

module.exports = logger