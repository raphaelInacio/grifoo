const redis = require("redis");
const enviroment = require('../../config/enviroments')
const pub = redis.createClient(enviroment.queued);

const QueuService = {
    sendToQueue:  async (message) => {
        console.log(`Enviando mensagem para fila ${message}, ${enviroment.queueName}`)
        await pub.publish(enviroment.queueName, message);
    }
}

module.exports = QueuService