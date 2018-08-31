var log4js = require('log4js');
log4js.configure( `${__dirname}/log4js.json`);
var logger = log4js.getLogger('app');
logger.info("Loggs is worked")
module.exports = logger

