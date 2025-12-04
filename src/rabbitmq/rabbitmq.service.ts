import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ConfigService } from '@nestjs/config';

type MessageHandler = (routingKey: string, payload: any) => Promise<void> | void;

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private conn: amqp.Connection;
  private channel: amqp.Channel;
  private readonly logger = new Logger(RabbitMQService.name);
  private exchange: string;

  constructor(private readonly config: ConfigService) {
    this.exchange = this.config.get<string>('EXCHANGE_NAME') || 'auctions_exchange';
  }

  async onModuleInit() {
    const url = this.config.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672';
    this.conn = await amqp.connect(url);
    this.channel = await this.conn.createChannel();
    await this.channel.assertExchange(this.exchange, 'topic', { durable: true,autoDelete: false });
    this.logger.log(`Connected to RabbitMQ at ${url}, exchange "${this.exchange}" ready`);
  }

  async publish(routingKey: string, message: any) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }
    const payload = Buffer.from(JSON.stringify(message));
    console.log("eee",payload)
    this.channel.publish(this.exchange, routingKey, payload, { persistent: true });
    this.logger.log(`Published ${routingKey}: ${JSON.stringify(message)}`);
  }

  async subscribe(bindingKey: string, handler: MessageHandler) {
    
    const queueName = `${bindingKey}_queue`; 
    const q = await this.channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false, // queue survives even if your app disconnects
    });

    await this.channel.bindQueue(q.queue, this.exchange, bindingKey);
    this.channel.consume(
      q.queue,
      async (msg) => {
        if (!msg) return;
        try {
          const routingKey = msg.fields.routingKey;
          const content = JSON.parse(msg.content.toString());
          await handler(routingKey, content);
          this.channel.ack(msg);
        } catch (err) {
          this.logger.error('Handler error', err);
          this.channel.nack(msg, false, false);
        }
      },
      { noAck: false }
    );
    this.logger.log(`Subscribed to "${bindingKey}" on queue ${q.queue}`);
  }

  async onModuleDestroy() {
    try {
      await this.channel?.close();
      await this.conn?.close();
    } catch (err) {
      this.logger.error('Error closing RabbitMQ', err);
    }
  }
}
