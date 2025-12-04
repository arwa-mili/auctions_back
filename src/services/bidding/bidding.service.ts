import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from './bid.entity';
import { CreateBidDto } from './dto/create-bid.dto';
import { RabbitMQService } from '../../rabbitmq/rabbitmq.service';

@Injectable()
export class BiddingService implements OnModuleInit {
  private readonly logger = new Logger(BiddingService.name);

  constructor(
    @InjectRepository(Bid)
    private readonly bidsRepo: Repository<Bid>,
    private readonly rabbit: RabbitMQService
  ) {}

  async onModuleInit() {
    await this.rabbit.subscribe('auction.*', async (key, payload) => {
      this.logger.log(`BiddingService received ${key}: ${JSON.stringify(payload)}`);
    });
  }

  async placeBid(dto: CreateBidDto): Promise<Bid> {
    const bid = this.bidsRepo.create({
      auctionId: dto.auctionId,
      bidderId: dto.bidderId,
      amount: dto.amount
    });
    return this.bidsRepo.save(bid);
  }

  async findByAuction(auctionId: string): Promise<Bid[]> {
    return this.bidsRepo.find({ where: { auctionId }, order: { createdAt: 'DESC' } });
  }
}
