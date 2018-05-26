var redis = require("redis");
const sub = redis.createClient('redis://queue:6379');
const pub = redis.createClient('redis://queue:6379');
const EmailService = require('../email/emailService')
const yargs = require('yargs')
const args = yargs.argv

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

console.log(`Conectando na fila ${args.QUEUE_NAME}`)
sub.subscribe(args.QUEUE_NAME);