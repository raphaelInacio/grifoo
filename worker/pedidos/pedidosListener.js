const redis = require("redis");
const enviroment = require('./enviroments')
const sub = redis.createClient(enviroments.queued);
const Pedidoservice = require('../pedidos/pedidosService')

sub.on("message", function (channel, message) {
    let pedido = JSON.parse(message)
    Pedidoservice.enviarEmailConfirmacaoPedido(pedido)
});

sub.subscribe(enviroments.queueName);

console.log(`Conectando na fila ${enviroments.queueName}`)
