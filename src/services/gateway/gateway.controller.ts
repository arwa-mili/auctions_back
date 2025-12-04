import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('gateway')
@Controller()
export class GatewayController {
  @Get()
  root() {
    return { status: 'ok', services: ['auction', 'bidding', 'identity', 'search'] };
  }
}
