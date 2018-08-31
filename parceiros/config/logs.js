const log4js = require('log4js');
log4js.configure({
  appenders: { parceiros: { type: 'file', filename: 'parceiros.log' } },
  categories: { default: { appenders: ['parceiros'], level: 'info' } }
});
const logger = log4js.getLogger('parceiros');
module.exports = logger