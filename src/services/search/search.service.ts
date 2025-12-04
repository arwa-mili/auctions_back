import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '../../rabbitmq/rabbitmq.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionIndex } from './schemas/auction-index.schema';
import { AuctionCreatedEvent } from '../../contracts/contracts.service';

@Injectable()
export class SearchService implements OnModuleInit {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    private readonly rabbit: RabbitMQService,
    @InjectModel('AuctionIndex') private readonly auctionIndexModel: Model<AuctionIndex>
  ) {}

  async onModuleInit() {
    await this.rabbit.subscribe('auction.created', async (_, payload: AuctionCreatedEvent) => {
      try {
        this.logger.log(`Indexing auction ${payload.id} (${payload.title})`);
        await this.auctionIndexModel.findOneAndUpdate(
          { id: payload.id },
          {
            id: payload.id,
            title: payload.title,
            startPrice: payload.startPrice,
            endsAt: new Date(payload.endsAt),
            ownerId: payload.ownerId
          },
          { upsert: true, new: true }
        );
      } catch (err) {
        this.logger.error('Failed to index auction', err);
      }
    });

    this.logger.log('SearchService initialized and subscribed to auction.created');
  }

  async searchByTitle(term: string) {
    if (!term) return this.auctionIndexModel.find().limit(50).exec();
    return this.auctionIndexModel
      .find({ title: { $regex: term, $options: 'i' } })
      .limit(50)
      .exec();
  }
}
