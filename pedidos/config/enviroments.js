const yargs = require('yargs')
const args = yargs.argv

const enviroments = {
    db: args.DB == undefined ? "mongodb://localhost:27017/db_data" : args.DB,
    queueName: args.QUEUE_NAME == undefined ? "grifoo-queue" : args.QUEUE_NAME,
    orcamentoQueue: args.ORCAMENTO_QUEUE == undefined ? "orcamento-queue" : args.ORCAMENTO_QUEUE,
    user: args.USER_NAME == undefined ? "admin" : args.USER_NAME,
    pass: args.USER_PASS == undefined ? "admin" : args.USER_PASS,
    queued: args.QUEUED == undefined ? "redis://localhost:6379" : args.QUEUED
}

module.exports = enviroments