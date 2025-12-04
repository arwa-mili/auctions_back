import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './bid.entity';
import { BiddingService } from './bidding.service';
import { BiddingController } from './bidding.controller';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bid]), RabbitMQModule],
  providers: [BiddingService],
  controllers: [BiddingController],
  exports: [BiddingService]
})
export class BiddingModule {}
