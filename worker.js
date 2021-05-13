var StatsD = require('hot-shots')
var amqp = require('amqplib/callback_api');
var ddtrace = require('dd-trace').init()

var dogstatsd = new StatsD();
dogstatsd.increment('page.views')
amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';
        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        var antes = Date.now();
        var count=0;
        ch.consume(q, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            count=+1;
            if(msg.content.toString() === "acabou"){
                var duracao = Date.now() - antes;
                console.log("Conseguiu ler",count,"mensagens em :"+duracao/1000 +"segundos.")
                    
            }
        }, { noAck: true });
    });
});
