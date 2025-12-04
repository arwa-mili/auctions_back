import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BiddingService } from './bidding.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('bids')
@Controller('api/bids')
export class BiddingController {
  constructor(private readonly svc: BiddingService) {}

  @Post()
  @ApiOperation({ summary: 'Place a bid on an auction' })
  async place(@Body() dto: CreateBidDto) {
    return this.svc.placeBid(dto);
  }

  @Get('auction/:auctionId')
  @ApiOperation({ summary: 'List bids for an auction' })
  async byAuction(@Param('auctionId') auctionId: string) {
    return this.svc.findByAuction(auctionId);
  }
}
