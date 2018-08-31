const redis = require("redis");
const enviroments = require('../../config/enviroments')
const publishConfirmacaoEmail = redis.createClient(enviroments.queued);
const publishOrcamentos = redis.createClient(enviroments.queued);
const logger = require('../../config/logs')

const QueuService = {
    confirmacaoEmail: (message) => {
        logger.info(`Enviando mensagem: ${message} para fila ${enviroments.emailQueueName}`)
        publishConfirmacaoEmail.publish(enviroments.queueName, message);
    },
    orcamentos: (message) => {
        logger.info(`Enviando mensagem: ${message} para fila ${enviroments.orcamentoQueue}`)
        publishOrcamentos.publish(enviroments.orcamentoQueue, message);
    }
}


module.exports = QueuService