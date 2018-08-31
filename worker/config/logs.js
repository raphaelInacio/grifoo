const log4js = require('log4js');
log4js.configure({
  appenders: { worker: { type: 'file', filename: 'worker.log' } },
  categories: { default: { appenders: ['worker'], level: 'info' } }
});
const logger = log4js.getLogger('worker');
module.exports = logger