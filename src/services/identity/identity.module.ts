import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { IdentityService } from './identity.service';
import { IdentityController } from './identity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [IdentityService],
  controllers: [IdentityController],
  exports: [IdentityService]
})
export class IdentityModule {}
