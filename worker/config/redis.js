var redis = require("redis");
const sub = redis.createClient('redis://queue:6379');
const pub = redis.createClient('redis://queue:6379');
const QUEUE_NAME = "grifoo-queue"

console.log(`######### conectando na fila ${QUEUE_NAME}`)

sub.on("message", function (channel, message) {
    console.log(`Message, ${channel}, ${message}`);
});

sub.on("subscribe", function (channel) {
    console.log(`Subscribe ${channel}`);
    pub.publish(QUEUE_NAME, "Testando envio de mensagem");
});

sub.subscribe(QUEUE_NAME);
