import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('search')
@Controller('api/search')
export class SearchController {
  constructor(private readonly svc: SearchService) {}

  @Get('auctions')
  @ApiOperation({ summary: 'Search indexed auctions by title' })
  async auctions(@Query('q') q?: string) {
    return this.svc.searchByTitle(q || '');
  }
}
