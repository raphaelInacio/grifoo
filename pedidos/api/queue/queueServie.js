const redis = require("redis");
const enviroments = require('../../config/enviroments')
const publishConfirmacaoEmail = redis.createClient(enviroments.queued);
const publishOrcamentos = redis.createClient(enviroments.queued);

const QueuService = {
    confirmacaoEmail: (message) => {
        console.log(`Enviando mensagem: ${message} para fila ${enviroments.emailQueueName}`)
        publishConfirmacaoEmail.publish(enviroments.queueName, message);
    },
    orcamentos: (message) => {
        console.log(`Enviando mensagem: ${message} para fila ${enviroments.orcamentoQueue}`)
        publishOrcamentos.publish(enviroments.orcamentoQueue, message);
    }
}


module.exports = QueuService