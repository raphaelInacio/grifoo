const redis = require("redis");
const enviroment = require('./enviroments')
const sub = redis.createClient(enviroments.queued);
const EmailService = require('../email/emailService')

sub.on("message", function (channel, message) {

    let pedido = JSON.parse(message)

    if (pedido.tipoPedido === 'EMPRESA') {
        console.log("ENVIAR EMAIL DE EMPRESA")
        EmailService.enviarEmailEvento(pedido)
    } else
    if (pedido.tipoPedido === 'EVENTO') {
        console.log("ENVIAR EMAIL DE EVENTO")
        EmailService.enviarEmailEvento(pedido)
    }
});

console.log(`Conectando na fila ${enviroments.queueName}`)

sub.subscribe(enviroments.queueName);