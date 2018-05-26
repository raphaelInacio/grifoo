const redis = require("redis");
const sub = redis.createClient('redis://queue:6379');
const pub = redis.createClient('redis://queue:6379');
let msg_count = 0;
const yargs = require('yargs')
const args = yargs.argv

sub.subscribe(args.QUEUE_NAME);

const QueuService = {
    sendToQueue:  (message) => {
        console.log(`Enviando mensagem para fila ${message}, ${args.QUEUE_NAME}`)
        pub.publish(args.QUEUE_NAME, message);
    }
}


module.exports = QueuService