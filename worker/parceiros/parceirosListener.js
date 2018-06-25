const redis = require("redis");
const enviroments = require('../config/enviroments')
const sub = redis.createClient(enviroments.queued);
const ParceirosService = require('../pedidos/pedidosService')

sub.on("message", function (channel, message) {
    let pedido = JSON.parse(message)
    ParceirosService.enviarEmailEvento(pedido)
});

sub.subscribe(enviroments.queueName);

console.log(`Conectando na fila ${enviroments.queueName}`)
