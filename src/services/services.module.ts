import { Module } from '@nestjs/common';
import { AuctionModule } from './auction/auction.module';
import { BiddingModule } from './bidding/bidding.module';
import { IdentityModule } from './identity/identity.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [AuctionModule, BiddingModule, IdentityModule, SearchModule],
  exports: []
})
export class ServicesModule {}
