import { Injectable } from '@nestjs/common';

export interface AuctionCreatedEvent {
  id: string;
  title: string;
  startPrice: number;
  endsAt: string;
  ownerId?: string;
}

@Injectable()
export class ContractsService {}
