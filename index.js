var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        let i=1;
        for(i;i<5000;i++){
            var q = 'hello';
            var msg = 'Hello' +i;
            ch.assertQueue(q, { durable: false });     
            ch.sendToQueue(q, new Buffer(msg));
          
            console.log(" [x] Sent %s", msg);
        }
        ch.sendToQueue(q, new Buffer("acabou"));
        // ch.sendToQueue(q, new Buffer("acabou"));
    });

    setTimeout(function () { conn.close(); process.exit(0) }, 500);
});
