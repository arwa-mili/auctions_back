import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction, AuctionStatus } from './auction.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { RabbitMQService } from '../../rabbitmq/rabbitmq.service';
import { AuctionCreatedEvent } from '../../contracts/contracts.service';

@Injectable()
export class AuctionService {
  private readonly logger = new Logger(AuctionService.name);

  constructor(
    @InjectRepository(Auction)
    private readonly repo: Repository<Auction>,
    private readonly rabbit: RabbitMQService
  ) {}

  async findAll(): Promise<Auction[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Auction | null> {
    return this.repo.findOneBy({ id });
  }

  async create(dto: CreateAuctionDto): Promise<Auction> {
    const entity = this.repo.create({
      title: dto.title,
      description: dto.description,
      startPrice: dto.startPrice,
      endsAt: new Date(dto.endsAt),
      status: AuctionStatus.Active,
      ownerId: dto.ownerId
    });
    const saved = await this.repo.save(entity);

    const event: AuctionCreatedEvent = {
      id: saved.id,
      title: saved.title,
      startPrice: Number(saved.startPrice),
      endsAt: saved.endsAt.toISOString(),
      ownerId: saved.ownerId
    };
    await this.rabbit.publish('auction.created', event);
    this.logger.log(`Published auction.created for ${saved.id}`);
    return saved;
  }
}
