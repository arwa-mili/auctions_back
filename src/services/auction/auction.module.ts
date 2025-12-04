import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';

@Module({
  imports: [TypeOrmModule.forFeature([Auction]), RabbitMQModule],
  providers: [AuctionService],
  controllers: [AuctionController],
  exports: [AuctionService]
})
export class AuctionModule {}
