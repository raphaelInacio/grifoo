const redis = require("redis");
const sub = redis.createClient('redis://queue:6379');
const pub = redis.createClient('redis://queue:6379');
const yargs = require('yargs')
const args = yargs.argv
const enviroments = require('../../config/enviroments')

sub.subscribe(enviroments.queueName);

const QueuService = {
    confirmacaoEmail: (message) => {
        console.log(`Enviando mensagem: ${message} para fila ${enviroments.queueName}`)
        pub.publish(enviroments.queueName, message);
    },
    orcamentos: (message) => {
        console.log(`Enviando mensagem: ${message} para fila ${enviroments.orcamentoQueue}`)
        pub.publish(enviroments.orcamentoQueue, message);
    }
}


module.exports = QueuService