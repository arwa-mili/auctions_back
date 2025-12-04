import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBidDto {
  @ApiProperty({ example: 'auction-uuid' })
  @IsString()
  auctionId: string;

  @ApiProperty({ example: 'user-uuid' })
  @IsString()
  bidderId: string;

  @ApiProperty({ example: 160.0 })
  @IsNumber()
  amount: number;
}
