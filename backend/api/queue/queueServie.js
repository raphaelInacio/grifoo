var redis = require("redis");
var sub = redis.createClient(), pub = redis.createClient();
var msg_count = 0;
const QUEUE_NAME = "grifoo-queue"
 

const QueuService = {
    sendToQueue : function (message) {
        sub.on("subscribe", function (channel, count) {
            pub.publish(QUEUE_NAME, message);
        });
    }
}

sub.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
    msg_count += 1;
    if (msg_count === 1) {
        sub.unsubscribe();
        sub.quit();
        pub.quit();
    }
});
 
sub.subscribe(QUEUE_NAME);

module.exports = QueuService