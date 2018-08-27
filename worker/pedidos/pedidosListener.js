const redis = require("redis");
const enviroment = require('../config/enviroments')
const sub = redis.createClient(enviroment.queued);
const Pedidoservice = require('../pedidos/pedidosService')

sub.on("message", function (channel, message) {
    let pedido = JSON.parse(message)
    Pedidoservice.enviarEmailConfirmacaoPedido(pedido)
});

sub.subscribe(enviroment.emailQueueName);

console.log(`Conectando na fila ${enviroment.emailQueueName}`)
