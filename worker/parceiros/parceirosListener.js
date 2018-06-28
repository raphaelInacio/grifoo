const redis = require("redis");
const enviroments = require('../config/enviroments')
const sub = redis.createClient(enviroments.queued);
const ParceirosService = require('../parceiros/parceirosService')

sub.on("message", function (channel, message) {
    let cadastroParceiro = JSON.parse(message)
    ParceirosService.enviarConfirmacaoParceiro(cadastroParceiro)
});

sub.subscribe(enviroments.parceiroQueueName);

console.log(`Conectando na fila ${enviroments.parceiroQueueName}`)
