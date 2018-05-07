const redis = require("redis");
const sub = redis.createClient('redis://queue:6379');
const pub = redis.createClient('redis://queue:6379');
let msg_count = 0;
const QUEUE_NAME = "grifoo-queue"
sub.subscribe(QUEUE_NAME);


const QueuService = {
    sendToQueue: function (message) {
        sub.on("subscribe", function (channel, count) {
            pub.publish(QUEUE_NAME, message);
        });
    }
}


module.exports = QueuService