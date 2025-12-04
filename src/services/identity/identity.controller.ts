import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('api/users')
export class IdentityController {
  constructor(private readonly svc: IdentityService) {}

  @Get()
  @ApiOperation({ summary: 'List users' })
  all() {
    return this.svc.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  create(@Body() body: CreateUserDto) {
    return this.svc.create(body.username, body.displayName);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  get(@Param('id') id: string) {
    return this.svc.findOne(id);
  }
}
