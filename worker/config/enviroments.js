const yargs = require('yargs')
const args = yargs.argv

const enviroments = {
    db: args.DB == undefined ? "mongodb://localhost:27017/db_data" : args.DB,
    queueName: args.QUEUE_NAME == undefined ? "grifoo-queue" : args.QUEUE_NAME,
    emailQueueName: args.EMAIL_QUEUE_NAME == undefined ? "email-queued" : args.EMAIL_QUEUE_NAME,
    parceiroQueueName: args.PARCEIRO_QUEUE_NAME == undefined ? "parceiro-queued" : args.PARCEIRO_QUEUE_NAME,
    user: args.USER_NAME == undefined ? "admin" : args.USER_NAME,
    pass: args.USER_PASS == undefined ? "admin" : args.USER_PASS,
    queued: args.REDIS == undefined ? "redis://localhost:6379" : args.REDIS,
    emailKey: args.EMAIL_KEY
}

module.exports = enviroments