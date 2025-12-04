import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuctionDto {
  @ApiProperty({ example: 'Golden watch', description: 'Title of the auction' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'An old watch in good condition' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  startPrice: number;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @IsDateString()
  endsAt: string;

  @ApiPropertyOptional({ example: 'user-123' })
  @IsOptional()
  @IsString()
  ownerId?: string;
}
