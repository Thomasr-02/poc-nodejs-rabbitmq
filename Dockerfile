FROM rabbitmq:3.7

RUN apt-get update && \
apt-get install -y axel

RUN axel -k https://github.com/noxdafox/rabbitmq-message-deduplication/releases/download/0.4.5/rabbitmq_message_deduplication-v3.7.x_0.4.5.ez\
    && axel -k https://github.com/noxdafox/rabbitmq-message-deduplication/releases/download/0.4.5/elixir-1.8.2.ez \
  && mv *.ez plugins/

EXPOSE 5672 15672

RUN rabbitmq-plugins enable rabbitmq_message_deduplication rabbitmq_management