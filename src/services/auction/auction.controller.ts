import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auction } from './auction.entity';

@ApiTags('auctions')
@Controller('api/auctions')
export class AuctionController {
  constructor(private readonly svc: AuctionService) {}

  @Get()
  @ApiOperation({ summary: 'List all auctions' })
  @ApiResponse({ status: 200, description: 'List returned.' })
  async all(): Promise<Auction[]> {
    return this.svc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get auction by id' })
  @ApiResponse({ status: 200, description: 'Auction returned.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async get(@Param('id') id: string) {
    const a = await this.svc.findOne(id);
    if (!a) throw new NotFoundException();
    return a;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new auction' })
  @ApiResponse({ status: 201, description: 'Auction created.' })
  async create(@Body() dto: CreateAuctionDto) {
    return this.svc.create(dto);
  }
}
