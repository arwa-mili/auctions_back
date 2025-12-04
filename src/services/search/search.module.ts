import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionIndex, AuctionIndexSchema } from './schemas/auction-index.schema';

@Module({
  imports: [
    RabbitMQModule,
    MongooseModule.forFeature([{ name: AuctionIndex.name, schema: AuctionIndexSchema }])
  ],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService]
})
export class SearchModule {}
