const yargs = require('yargs')
const args = yargs.argv

const enviroments = {
    db: args.DB == undefined ? "mongodb://localhost:27017/db_data" : args.DB,
    queueName: args.QUEUE_NAME == undefined ? "grifoo-queue" : args.QUEUE_NAME,
    user: args.USER_NAME == undefined ? "admin" : args.USER_NAME,
    pass: args.USER_PASS == undefined ? "admin" : args.USER_PASS,
    queued : args.REDIS == undefined ? "redis://localhost:6379" : args.REDIS,
    url: args.URL == undefined ? 'http://localhost:3003' : args.URL
}

module.exports = enviroments