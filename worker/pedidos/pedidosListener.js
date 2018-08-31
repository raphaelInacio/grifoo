const redis = require("redis");
const enviroment = require('../config/enviroments')
const sub = redis.createClient(enviroment.queued);
const Pedidoservice = require('../pedidos/pedidosService')
const logger = require('../config/logs')

sub.on("message", function (channel, message) {
    let pedido = JSON.parse(message)
    logger.info(`Enviando email de confirmação de pedido ${pedido}`)
    Pedidoservice.enviarEmailConfirmacaoPedido(pedido)
});

sub.subscribe(enviroment.emailQueueName);

logger.info(`Conectando na fila ${enviroment.emailQueueName}`)
