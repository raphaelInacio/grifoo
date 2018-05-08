var redis = require("redis");
const sub = redis.createClient('redis://queue:6379');
const pub = redis.createClient('redis://queue:6379');
const QUEUE_NAME = "grifoo-queue"

console.log(`######### conectando na fila ${QUEUE_NAME} \n`)

sub.on("message", function (channel, message) {

    let pedido = JSON.parse(message)

    console.log(pedido)

    if (pedido.tipoPedido === 'EMPRESA') {
        console.log("ENVIAR EMAIL DE EMPRESA")
    } else
    if (pedido.tipoPedido === 'EVENTO') {
        console.log("ENVIAR EMAIL DE EVENTO")
    }
});

sub.subscribe(QUEUE_NAME);