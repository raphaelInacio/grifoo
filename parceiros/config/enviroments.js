const yargs = require('yargs')
const args = yargs.argv

const enviroments = {
    db: args.DB == undefined ? "mongodb://localhost:27017/db_data" : args.DB,
    queueName: args.QUEUE_NAME == undefined ? "grifoo-queue" : args.QUEUE_NAME,
    emailQueueName: args.EMAIL_QUEUE_NAME == undefined ? "email-queue" : args.EMAIL_QUEUE_NAME,
    parceiroQueueName: args.PARCEIRO_QUEUE_NAME == undefined ? "parceiro-queue" : args.PARCEIRO_QUEUE_NAME,
    orcamentoQueue: args.ORCAMENTO_QUEUE == undefined ? "orcamento-queue" : args.ORCAMENTO_QUEUE,
    user: args.USER_NAME == undefined ? "admin" : args.USER_NAME,
    pass: args.USER_PASS == undefined ? "admin" : args.USER_PASS,
    queued: args.REDIS == undefined ? "redis://localhost:6379" : args.REDIS,
    emailKey: args.EMAIL_KEY,
    urlPedidos: args.URL_PEDIDOS == undefined ? "http://pedidos:3003/api/v1" : args.URL_PEDIDOS,
    urlParceiros: args.URL_PARCEIROS == undefined ? "http://parceiros:3004/api/v1" : args.URL_PARCEIROS
}

module.exports = enviroments