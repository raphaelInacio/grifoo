const redis = require("redis");
const enviroment = require('../../config/enviroments')
const pub = redis.createClient(enviroment.queued);
const logger = require('../../config/logs')

const QueuService = {
    sendToQueue: async (message) => {
        logger.info(`Enviando mensagem para fila ${message}, ${enviroment.parceiroQueueName}`)
        await pub.publish(enviroment.parceiroQueueName, message);
    }
}

module.exports = QueuService